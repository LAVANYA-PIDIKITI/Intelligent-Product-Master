const express = require('express');
const axios = require('axios');
const moment = require('moment');
const Chart = require('chart.js');

const app = express();
const port = 3000;

// Replace these variables with your Jira credentials and project information
const JIRA_API_BASE_URL = 'https://ipm-team-e3unughe.atlassian.net/rest/api/3';
const USERNAME = 'monica.24cs@licet.ac.in'; 
const API_TOKEN = 'ATATT3xFfGF0Ou2XQQyTsbbc69jARExqVNd00VOLGZ8oRiPzdova8eN7QVZsmYgYEWfaODIgujVrsDS95u9AlET-6efZOql9tic1Rc3x-4BQ7EkKka0f8shrX3Q9QcBM9p5t6xTjNEVz0_mBfprR9JtUkLQPyCawi7xrAui59ua6ZSp4uQGHUzk=5BC3CA8E';

// Jira API endpoint to get issues created
const jiraApiEndpoint = `${JIRA_API_BASE_URL}`;

// Function to fetch issues created over time
const fetchIssuesCreatedOverTime = async (projectId) => {
    try {
        const response = await axios.get(`${jiraApiEndpoint}/search`, {
            params: {
                jql: `project = ${projectId} AND created >= -30d`, // Fetching issues created in the last year
                maxResults: 50, // Adjust as needed
                fields: 'created',
                expand: 'changelog',
            },
            auth: {
                username: USERNAME,
                password: API_TOKEN,
            },
        });

        const issues = response.data.issues;
        const issuesCreatedOverTime = {};

        issues.forEach(issue => {
            const createdDate = moment(issue.fields.created).format('YYYY-MM-DD');
            if (issuesCreatedOverTime[createdDate]) {
                issuesCreatedOverTime[createdDate]++;
            } else {
                issuesCreatedOverTime[createdDate] = 1;
            }
        });

        return issuesCreatedOverTime;
    } catch (error) {
        console.error('Error fetching data from Jira:', error);
        throw error;
    }
};

// Route to fetch data and generate chart
app.get('/issues-created-over-time/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params
        const issuesCreatedOverTime = await fetchIssuesCreatedOverTime(projectId);
        const labels = Object.keys(issuesCreatedOverTime);
        const data = Object.values(issuesCreatedOverTime);

        res.json({ labels, data });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const fetchIssuesData = async (projectId) => {
    try {
        const response = await axios.get(`${jiraApiEndpoint}/search`, {
            params: {
                jql: `project = ${projectId}`,
                maxResults: 1000, // Adjust as needed
                fields: 'assignee,priority,status,resolution',
            },
            auth: {
                username: USERNAME,
                password: API_TOKEN,
            },
        });

        return response.data.issues;
    } catch (error) {
        console.error('Error fetching data from Jira:', error);
        throw error;
    }
};

// Route to fetch data and generate heatmap
app.get('/heatmap/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        const issues = await fetchIssuesData(projectId);

        // Aggregate data for heatmap
        const heatmapData = {};
        issues.forEach(issue => {
            const assignee = issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned';
            const priority = issue.fields.priority ? issue.fields.priority.name : 'Unknown';
            if (!heatmapData[assignee]) {
                heatmapData[assignee] = {};
            }
            if (!heatmapData[assignee][priority]) {
                heatmapData[assignee][priority] = 0;
            }
            heatmapData[assignee][priority]++;
        });

        res.json(heatmapData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Jira API endpoint to get sprint data
const jiraSprintApiEndpoint = `https://ipm-team-e3unughe.atlassian.net/rest/agile/1.0/board/`;

// Function to fetch sprint data
const fetchSprintData = async (projectId) => {
    try {
        const response = await axios.get(`${jiraSprintApiEndpoint}/${projectId}/sprint`, {
            auth: {
                username: USERNAME,
                password: API_TOKEN,
            },
        });

        return response.data.values;
    } catch (error) {
        console.error('Error fetching sprint data from Jira:', error);
        throw error;
    }
};

// Calculate percentage of work done and remaining work for each sprint
const calculateSprintProgress = (sprints) => {
    return sprints.map(sprint => {
        const completedIssues = sprint.closedIssues || 0;
        const totalIssues = sprint.closedIssues + sprint.issuesNotCompletedEstimateSum;
        const progress = (completedIssues / totalIssues) * 100 || 0;
        let remainingWork = 0; // Change from const to let

        if(progress === 0) { // Change from progress = 0 to progress === 0
            remainingWork = 100;
        } else {
            remainingWork = totalIssues - completedIssues;
        }

        return {
            name: sprint.name,
            progress: progress.toFixed(2),
            remainingWork,
        };
    });
};

// Route to fetch sprint progress data
app.get('/sprint-progress/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params
        const sprintData = await fetchSprintData(projectId);
        const sprintProgress = calculateSprintProgress(sprintData);
        res.json(sprintProgress);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const fetchVersionData = async (projectId) => {
    try {
        const response = await axios.get(`${jiraApiEndpoint}/project/${projectId}/versions`, {
            auth: {
                username: USERNAME,
                password: API_TOKEN,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching version data from Jira:', error);
        throw error;
    }
};

// Function to calculate resolved issues count for each version
const calculateResolvedIssuesCount = async (versions, projectId) => {
    const resolvedIssuesCount = {};

    for (const version of versions) {
        try {
            const response = await axios.get(`${JIRA_API_BASE_URL}/search`, {
                params: {
                    jql: `project = ${projectId} AND fixVersion = "${version.name}" AND resolutiondate >= "${version.releaseDate}"`,
                    maxResults: 1,
                    fields: 'key',
                },
                auth: {
                    username: USERNAME,
                    password: API_TOKEN,
                },
            });

            resolvedIssuesCount[version.name] = response.data.total;
        } catch (error) {
            console.error(`Error fetching resolved issues count for version ${version.name}:`, error);
            resolvedIssuesCount[version.name] = 0;
        }
    }

    return resolvedIssuesCount;
};

// Route to fetch version release trends data
app.get('/version-release-trends/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        const versionData = await fetchVersionData(projectId);
        
        // Filter versions based on your requirement (e.g., include both released and unreleased versions)
        const versions = versionData; // Modify the filtering logic as needed

        const resolvedIssuesCount = await calculateResolvedIssuesCount(versions, projectId);

        const releaseTrends = versions.map(version => {
            return {
                name: version.name,
                releaseDate: version.releaseDate,
                resolvedIssuesCount: resolvedIssuesCount[version.name] || 0, // Handle case when no resolved issues found
            };
        });

        res.json(releaseTrends);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://127.0.0.1:${port}`);
});
