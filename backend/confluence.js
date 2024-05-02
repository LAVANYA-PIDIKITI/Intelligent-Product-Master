const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Confluence API Configuration
const CONFLUENCE_API_URL = 'https://lavlavlav.atlassian.net';
const USERNAME = 'lavanyapidikiti.24cs@licet.ac.in';
const PASSWORD = 'ATATT3xFfGF0KPYlo8P_XWkytRxIDGwgrDfWCF_s_de_ke8bO-hLtoEAzkX-70X3VY76F4JxMWUAfCgOSov6FFFogeGPvjnwHwnuH5VBXYvr9j9kP-IcEdDvf_v2CRqK8LB8ic78sgSrLOBrge3MaYTLhiJ1m9ahyFtCzywpIN9Ddir2EkF96nM=21240726'; // or password if you're using basic auth

//Get page details Confluence
app.get('/read-page/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;

    // Make request to Confluence API
    const response = await axios.get(`${CONFLUENCE_API_URL}/wiki/rest/api/content/${pageId}`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error reading page:', error);
    res.status(500).json({message:'Failed to read page'});
  }
});

// Create a new page in Confluence 
app.post('/create-page', async (req, res) => {
  try {
    const { title, content, SPACE_KEY, type } = req.body;

    // Construct request payload
    const pageData = {
      type: type,
      title: title,
      space: { key: SPACE_KEY },
      body: {
          value: content,
          representation: 'storage',
      },
    };

    // Make request to Confluence API
    const response = await axios.post(`${CONFLUENCE_API_URL}/wiki/rest/api/content`, pageData, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating page:', error.response.data);
    res.status(error.response.status || 500).json({ error: 'Failed to create page' });
  }
});

//update-page
app.put('/update-page/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
    const { title, content, version } = req.body;

    // Construct request payload
    const pageData = {
      id: pageId,
      type: 'page',
      title: title,
      body: {
          value: content,
          representation: 'storage',
      },
      version
    };

    // Make request to Confluence API
    const response = await axios.put(`${CONFLUENCE_API_URL}/wiki/rest/api/content/${pageId}`, pageData, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error updating page:', error.response.data);
    res.status(error.response.status || 500).json({ error: 'Failed to update page' });
  }
});

//delete specific page
app.delete('/delete-page/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
    // Make request to Confluence API
    const response = await axios.delete(`${CONFLUENCE_API_URL}/wiki/rest/api/content/${pageId}`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: 'Failed to delete page' });
  }
});

// get all pages
app.get('/pages', async (req, res) => {
  try { 
    const response = await axios.get(`${CONFLUENCE_API_URL}/wiki/api/v2/pages`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });
    res.json(response.data);
  }
  catch(error){
    console.log(error);
    res.json({message: "An error occurred"})
  }
});

//get specific page
app.get('/pages/:pageId', async (req, res) => {
  try { 
    const { pageId } = req.params;
    const response = await axios.get(`${CONFLUENCE_API_URL}/wiki/api/v2/pages/${pageId}`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });
    res.json(response.data);
  }
  catch(error){
    console.log(error);
    res.json({message: "An error occurred"})
  }
});

// Create a new comment on a page
app.post('/create-comment', async (req, res) => {
  try {
    const { pageId, comment } = req.body;

    // Construct request payload
    const commentData = {
      pageId: pageId,
      body: {
        value: comment,
        representation: 'storage'
      }
    };

    // Make request to Confluence API
    const response = await axios.post(`${CONFLUENCE_API_URL}/wiki/api/v2/footer-comments`, commentData, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// get footer comments on a page 
app.get('/footer-comments/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;

    // Make request to Confluence API
    const response = await axios.get(`${CONFLUENCE_API_URL}/wiki/api/v2/pages/${pageId}/footer-comments`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error reading comments:', error);
    res.status(500).json({ error: 'Failed to read comments' });
  }
});

// get inline comments on a page 
app.get('/inline-comments/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;

    // Make request to Confluence API
    const response = await axios.get(`${CONFLUENCE_API_URL}/wiki/api/v2/pages/${pageId}/inline-comments`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error reading comments:', error);
    res.status(500).json({ error: 'Failed to read comments' });
  }
});

//get footer-comments by id for a page
app.get('/read-comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;

    // Make request to Confluence API
    const response = await axios.get(`${CONFLUENCE_API_URL}/wiki/api/v2/footer-comments/${commentId}`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error reading comments:', error);
    res.status(500).json({ error: 'Failed to read comments' });
  }
});

//get children footer-comments by id for a page
app.get('/read-comments/:commentId/children', async (req, res) => {
  try {
    const { commentId } = req.params;

    // Make request to Confluence API
    const response = await axios.get(`${CONFLUENCE_API_URL}/wiki/api/v2/footer-comments/${commentId}/children`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error reading comments:', error);
    res.status(500).json({ error: 'Failed to read comments' });
  }
});

// Delete comment from Confluence
app.delete('/delete-comment/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;

    // Make request to Confluence API
    const response = await axios.delete(`${CONFLUENCE_API_URL}/wiki/api/v2/footer-comments/${commentId}`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json({ statuscode: 200 });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

//edit a comment
app.put('/edit-comment/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;

    const getCommentResponse = await axios.get(`${CONFLUENCE_API_URL}/wiki/api/v2/footer-comments/${commentId}`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });
    const currentVersionNumber = getCommentResponse.data.version.number;

    const { message } = req.body;
    // Construct the request payload
    const requestBody = {
      version: {
        number: currentVersionNumber + 1, // Increment the version number
      },
      type: 'comment', // Specify the type as 'comment'
      container: {
        id: commentId,
        type: 'page', // Assuming the comment is on a page
      },
      body: {
        value: message,
        representation: 'storage',        
      },
    };

    // Make request to update the comment
    const response = await axios.put(`${CONFLUENCE_API_URL}/wiki/api/v2/footer-comments/${commentId}`, requestBody, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Error editing comment:', error.response.data);
    res.status(error.response.status || 500).json({ error: 'Failed to edit comment' });
  }
});

//get all attachments
app.get('/attachments', async (req, res) => {
  try {
    const response = await axios.get(`${CONFLUENCE_API_URL}/wiki/api/v2/attachments`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error reading comments:', error);
    res.status(500).json({ error: 'Failed to read comments' });
  }
});

// Delete attachment from Confluence
app.delete('/delete-attachment/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;

    // Make request to Confluence API
    const response = await axios.delete(`${CONFLUENCE_API_URL}/wiki/api/v2/attachments/${attachmentId}`, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    res.json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    console.error('Error deleting attachment:', error.response.data);
    res.status(error.response.status || 500).json({ error: 'Failed to delete attachment' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
