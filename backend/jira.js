const axios = require('axios');
const { createServer } = require('node:http');
const cors = require('cors');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const hostname = '127.0.0.1';

app.use(cors());

app.use(express.json());

const JIRA_API_BASE_URL = 'https://lavlav.atlassian.net/rest/api/3/';
const USERNAME = 'lavanyapidikiti.24cs@licet.ac.in'; 
const API_TOKEN = 'ATATT3xFfGF0KPYlo8P_XWkytRxIDGwgrDfWCF_s_de_ke8bO-hLtoEAzkX-70X3VY76F4JxMWUAfCgOSov6FFFogeGPvjnwHwnuH5VBXYvr9j9kP-IcEdDvf_v2CRqK8LB8ic78sgSrLOBrge3MaYTLhiJ1m9ahyFtCzywpIN9Ddir2EkF96nM=21240726';

const base64Credentials = Buffer.from(`${USERNAME}:${API_TOKEN}`).toString('base64');

//Get issues API
app.get('/api/issues/:projectName', async (req, res) => {
  try {
      const { projectName } = req.params;
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
    const response = await axios.post(`${JIRA_API_BASE_URL}/issue`, requestBody, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ statuscode: 200});
  } catch (error) {
    console.error('Error creating issue:', error);
    res.json(error);
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

    res.json({ statuscode: 201});
  } catch (error) {
    console.error( error);
    res.json(error);
  }
});

// get specific issue details
app.get('/api/specific/issues/:issueId', async (req, res) => {
  try {
    const { issueId } = req.params;

    const response = await axios.get(`${JIRA_API_BASE_URL}/issue/${issueId}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error getting issue details:', error);
    res.json(error);
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
    console.error('Error deleting issue:', error);
    res.json(error);
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

    res.json(response.data);
  } catch (error) {
    console.error('Error getting project details:', error);
    res.json(error);
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
      leadAccountId
    };

    const response = await axios.post(`${JIRA_API_BASE_URL}project`, requestBody, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error creating project:', error);
    res.json(error);
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
    console.error('Error updating project details:', error);
    res.json(error);
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
    console.error('Error deleting project:', error);
    res.json(error);
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

    res.json(response.data);
  } catch (error) {
    console.error('Error getting available transitions for an issue:', error);
    res.json(error);
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
    console.error('Error transitioning issue to a different status:', error);
    res.json(error);
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
    const response = await axios.get(`${JIRA_API_BASE_URL}/user/search?query=${query}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error searching for users:', error);
    res.json(error);
  }
});

//get user permissions
app.get('/api/users/:permissionsList/permissions', async (req, res) => {
  try {
    const { permissionsList } = req.params;

    const response = await axios.get(`${JIRA_API_BASE_URL}/mypermissions?permissions=${encodeURIComponent(permissionsList)}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error getting user permissions:', error.response.data);
    res.status(error.response.status).json(error.response.data);
  }
});


app.listen(PORT,hostname, () => {
  console.log(`Server is running on http://${hostname}:${PORT}/`);
});

