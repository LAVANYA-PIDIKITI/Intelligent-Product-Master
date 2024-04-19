const axios = require('axios');
const { createServer } = require('node:http');
const cors = require('cors');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const hostname = '127.0.0.1';

app.use(cors());

app.use(express.json());

const JIRA_API_BASE_URL = 'https://ipm-team-e3unughe.atlassian.net/rest/api/3';
const USERNAME = 'monica.24cs@licet.ac.in'; 
const API_TOKEN = 'ATATT3xFfGF0Ou2XQQyTsbbc69jARExqVNd00VOLGZ8oRiPzdova8eN7QVZsmYgYEWfaODIgujVrsDS95u9AlET-6efZOql9tic1Rc3x-4BQ7EkKka0f8shrX3Q9QcBM9p5t6xTjNEVz0_mBfprR9JtUkLQPyCawi7xrAui59ua6ZSp4uQGHUzk=5BC3CA8E';

const base64Credentials = Buffer.from(`${USERNAME}:${API_TOKEN}`).toString('base64');

//Get issues API
app.get('/api/issues/:projectName', async (req, res) => {
  try {
      const { projectName } = req.params;
      console.log(projectName)
      const response = await axios.get(`${JIRA_API_BASE_URL}/search`, {
          params: {
              jql: `project=${projectName}`, 
          },
          headers: {
              'Authorization': `Basic ${base64Credentials}`
          }
      });
      res.json(response.data); // Sending only the data back in the response
  } catch (error) {
      console.error(error); // Logging the entire error object
      res.status(500).json({ message: 'Internal Server Error' }); // Sending a generic error response
  }
});


//Create an issue
app.post('/api/issues', async (req, res) => {
  try {
    const { summary, description, projectKey, issueType } = req.body;
    const requestBody = {
      fields: {
        project: {
          key: projectKey
        },
        summary,
        description,
        issuetype: {
          id: issueType
        }
      } 
    };
    console.log(requestBody);
    const response = await axios.post(`${JIRA_API_BASE_URL}/issue`, requestBody, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ statuscode: 200});
  } catch (error) {
    console.error('Error creating issue:', error.response);
    res.json(error.response);
  }
});

// update issues
app.put('/api/issues/:issueId', async (req, res) => {
  try {
    const { issueId } = req.params;
    const { summary, description, projectKey } = req.body;
    const requestBody = {
      fields: {
        project: {
          key: projectKey
        },
        summary,
        description
      }
    };
    const response = await axios.put(`${JIRA_API_BASE_URL}/issue/${issueId}`, requestBody, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response);
  } catch (error) {
    console.error( error.response);
    res.json(error.response);
  }
});

// get specific issue details
app.get('/api/issues/:issueId', async (req, res) => {
  try {
    const { issueId } = req.params;

    const response = await axios.get(`${JIRA_API_BASE_URL}/issue/${issueId}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response);
  } catch (error) {
    console.error('Error getting issue details:', error.response);
    res.json(error.response);
  }
});

//Delete an issue
app.delete('/api/issues/:issueId', async (req, res) => {
  try {
    const { issueId } = req.params;
    const response = await axios.delete(`${JIRA_API_BASE_URL}/issue/${issueId}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ statuscode: 204});
  } catch (error) {
    console.error('Error deleting issue:', error.response);
    res.json(error.response);
  }
});

//get all project details
app.get('/projects', async (req, res) => {
  try {
    const response = await axios.get(`${JIRA_API_BASE_URL}/project`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error getting project details:', error);
    res.json(error);
  }
});

//get specific project details
app.get('/api/projects/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    const response = await axios.get(`${JIRA_API_BASE_URL}/project/${projectId}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response);
  } catch (error) {
    console.error('Error getting project details:', error.response);
    res.json(error.response);
  }
});

// create a project
app.post('/api/projects', async (req, res) => {
  try {
    const { key, name,leadAccountId,projectTypeKey } = req.body;
    const requestBody = {
      key,
      name,
      projectTypeKey,
      leadAccountId,
      assigneeType
    };

    const response = await axios.post(`${JIRA_API_BASE_URL}/project`, requestBody, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response);
  } catch (error) {
    console.error('Error creating project:', error.response);
    res.json(error.response);
  }
});

// update project details
app.put('/api/projects/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;
    const requestBody = {
      name,
      description
    };

    const response = await axios.put(`${JIRA_API_BASE_URL}/project/${projectId}`, requestBody, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response);
  } catch (error) {
    console.error('Error updating project details:', error.response);
    res.json(error.response);
  }
});

//delete a project
app.delete('/api/projects/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    const response = await axios.delete(`${JIRA_API_BASE_URL}/project/${projectId}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error.response);
    res.json(error.response);
  }
});

// get available transitions for an issue
app.get('/api/issues/:issueId/transitions', async (req, res) => {
  try {
    const { issueId } = req.params;

    const response = await axios.get(`${JIRA_API_BASE_URL}/issue/${issueId}/transitions`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response);
  } catch (error) {
    console.error('Error getting available transitions for an issue:', error.response);
    res.json(error.response);
  }
});

// transition an issue to a different status
app.post('/api/issues/:issueId/transitions', async (req, res) => {
  try {
    const { issueId } = req.params;
    const { transitionId } = req.body;
    const requestBody = {
      transition: {
        id: transitionId
      }
    };

    const response = await axios.post(`${JIRA_API_BASE_URL}/issue/${issueId}/transitions`, requestBody, {
      headers: {
        'Authorization': `Basic ${base64Credentials} `,
        'Content-Type': 'application/json'
      }
    });

    res.json(response);
  } catch (error) {
    console.error('Error transitioning issue to a different status:', error.response);
    res.json(error.response);
  }
});

//get user details
app.get('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const response = await axios.get(`${JIRA_API_BASE_URL}/user?accountId=${username}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error getting user details:', error);
    res.json(error);
  }
});

//search for users
app.get('/api/users/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    console.log(query);
    const response = await axios.get(`${JIRA_API_BASE_URL}/user/search?query=${query}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
      }
    });

    res.json(response);
  } catch (error) {
    console.error('Error searching for users:', error.response);
    res.json(error.response);
  }
});

app.listen(PORT,hostname, () => {
  console.log(`Server is running on http://${hostname}:${PORT}/`);
});


