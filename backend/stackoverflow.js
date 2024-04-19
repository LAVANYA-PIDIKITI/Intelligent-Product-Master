const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const STACK_OVERFLOW_API_KEY = 'FQBiDGX1lw9B6eZ2)BK6SA((';

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle queries
app.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;

    // Make a request to the Stack Overflow API to search for relevant questions
    const questionsResponse = await axios.get('https://api.stackexchange.com/2.3/search', {
      params: {
        key: STACK_OVERFLOW_API_KEY,
        site: 'stackoverflow',
        order: 'desc',
        sort: 'activity',
        intitle: query
      }
    });

    // Extract question IDs from the response
    const questionIds = questionsResponse.data.items.map(item => item.question_id);

    // Fetch answers for each question and order by votes
    const answersPromises = questionIds.map(async (questionId) => {
      const answersResponse = await axios.get(`https://api.stackexchange.com/2.3/questions/${questionId}/answers`, {
        params: {
          key: STACK_OVERFLOW_API_KEY,
          site: 'stackoverflow',
          order: 'desc',
          sort: 'votes',
          filter: 'withbody' // Include answer body in the response
        }
      });

      // Extract relevant information from the answers response
      const answers = answersResponse.data.items.map(item => {
        // Load answer HTML into Cheerio
        const $ = cheerio.load(item.body);
        // Extract text content of the answer
        const answerText = $.root().text().trim();
        return {
          ownerName: item.owner.display_name,
          answer: answerText
        };
      });
      return answers;
    });

    // Wait for all answers to be fetched
    const allAnswers = await Promise.all(answersPromises);

    // Flatten the array of arrays into a single array of answers
    const flattenedAnswers = allAnswers.flat();

    res.json(flattenedAnswers);
  } catch (error) {
    console.error('Error fetching data from Stack Overflow API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
