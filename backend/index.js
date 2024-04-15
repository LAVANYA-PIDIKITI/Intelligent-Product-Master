const axios = require('axios');
const { createServer } = require('node:http');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const hostname = '127.0.0.1';
app.use(express.json());

const JIRA_API_BASE_URL = 'https://ipm-team-e3unughe.atlassian.net/rest/api/3';
const USERNAME = 'monica.24cs@licet.ac.in'; 
const API_TOKEN = 'ATATT3xFfGF0LYjKXJAaDHObzKRonRBC-Ec5yPROTe7FE7gUKoCFl-QitzfENpZ32GezDq8gUcJjLdH5zfhduW2dt0Q9sQSeSEU01iWVt4SxG4VtArfhQaa4lc2TrHWiaGkKZempwxjDTNXPxs-K0ngQOxiJK0z0P0eZxw8RGY1lWaVALSxACOo=B91EF103';

const base64Credentials = Buffer.from(`${USERNAME}:${API_TOKEN}`).toString('base64');

//Get issues API
// app.get('/api/issues', async (req, res) => {
//     try {
//       const response = await axios.get(`${JIRA_API_BASE_URL}/search`, {
//         params: {
//           jql: 'project=KAN', 
//         },
//         headers: {
//           'Authorization': `Basic ${base64Credentials}`
//         }
//       });
  
//       res.json(response.data);
//     } catch (error) {
//       console.error('Error fetching issues:', error.response.data);
//       res.status(error.response.status).json(error.response.data);
//     }
//   });

//Create an issue
// app.post('/api/issues', async (req, res) => {
//   try {
//     const { summary, description, projectKey, issueType } = req.body;
//     const requestBody = {
//       fields: {
//         project: {
//           key: projectKey
//         },
//         summary,
//         description,
//         issuetype: {
//           id: issueType
//         }
//       } 
//     };

//     const response = await axios.post(`${JIRA_API_BASE_URL}/issue`, requestBody, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error creating issue:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

//update issues
// app.put('/api/issues/:issueId', async (req, res) => {
//   try {
//     const { issueId } = req.params;
//     const { summary, description, projectKey } = req.body;
//     const requestBody = {
//       fields: {
//         project: {
//           key: projectKey
//         },
//         summary,
//         description
//       }
//     };
//     const response = await axios.put(`${JIRA_API_BASE_URL}/issue/${issueId}`, requestBody, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error( error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

//get specific issue details
// app.get('/api/issues/:issueId', async (req, res) => {
//   try {
//     const { issueId } = req.params;

//     const response = await axios.get(`${JIRA_API_BASE_URL}/issue/${issueId}`, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error getting issue details:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

//Delete an issue
// app.delete('/api/issues/:issueId', async (req, res) => {
//   try {
//     const { issueId } = req.params;
//     console.log(issueId)
//     const response = await axios.delete(`${JIRA_API_BASE_URL}/issue/${issueId}`, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json({ message: 'Issue deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting issue:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

// Endpoint to search for issues using JQL
// app.get('/api/search/:jql', async (req, res) => {
//   try {
//     const { jql } = req.params;
//     const response = await axios.get(`${JIRA_API_BASE_URL}/search?jql=${jql}`, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error searching for issues:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

// get issue count
// app.get('/api/issues/count/:jql', async (req, res) => {
//   try {
//     const { jql } = req.params;

//     const response = await axios.get(`${JIRA_API_BASE_URL}/search?jql=${jql}&maxResults=0`, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const count = response.data.total;
//     res.json({ count });
//   } catch (error) {
//     console.error('Error getting issue count:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

//get project details
// app.get('/api/projects/:projectId', async (req, res) => {
//   try {
//     const { projectId } = req.params;

//     const response = await axios.get(`${JIRA_API_BASE_URL}/project/${projectId}`, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error getting project details:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

// create a project
// app.post('/api/projects', async (req, res) => {
//   try {
//     const { key, name,leadAccountId,projectTypeKey } = req.body;
//     const requestBody = {
//       key,
//       name,
//       projectTypeKey,
//       leadAccountId,
//       assigneeType:"PROJECT_LEAD",
//     };

//     const response = await axios.post(`${JIRA_API_BASE_URL}/project`, requestBody, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error creating project:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

// update project details
// app.put('/api/projects/:projectId', async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { name, description } = req.body;
//     const requestBody = {
//       name,
//       description
//     };

//     const response = await axios.put(`${JIRA_API_BASE_URL}/project/${projectId}`, requestBody, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error updating project details:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

//delete a project
// app.delete('/api/projects/:projectId', async (req, res) => {
//   try {
//     const { projectId } = req.params;

//     const response = await axios.delete(`${JIRA_API_BASE_URL}/project/${projectId}`, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json({ message: 'Project deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting project:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

// get available transitions for an issue
// app.get('/api/issues/:issueId/transitions', async (req, res) => {
//   try {
//     const { issueId } = req.params;

//     const response = await axios.get(`${JIRA_API_BASE_URL}/issue/${issueId}/transitions`, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error getting available transitions for an issue:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

// transition an issue to a different status
// app.post('/api/issues/:issueId/transitions', async (req, res) => {
//   try {
//     const { issueId } = req.params;
//     const { transitionId } = req.body;
//     const requestBody = {
//       transition: {
//         id: transitionId
//       }
//     };

//     const response = await axios.post(`${JIRA_API_BASE_URL}/issue/${issueId}/transitions`, requestBody, {
//       headers: {
//         'Authorization': `Basic ${base64Credentials} `,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error transitioning issue to a different status:', error.response.data);
//     res.status(error.response.status).json(error.response.data);
//   }
// });

//get workflow details
app.get('/api/workflows/:workflowId', async (req, res) => {
  try {
    const { workflowId } = req.params;

    const response = await axios.get(`${JIRA_API_BASE_URL}/workflow/${workflowId}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials} `,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error getting workflow details:', error.response.data);
    res.status(error.response.status).json(error.response.data);
  }
});


app.listen(PORT,hostname, () => {
  console.log(`Server is running on http://${hostname}:${PORT}/`);
});


