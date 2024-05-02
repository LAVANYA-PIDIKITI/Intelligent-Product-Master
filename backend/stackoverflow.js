const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const NodeCache = require('node-cache');

const app = express();
const PORT = process.env.PORT || 3002;
const STACK_OVERFLOW_API_KEY = 'FQBiDGX1lw9B6eZ2)BK6SA((';
const cache = new NodeCache({ stdTTL: 6000 }); 

app.use(cors());
app.use(express.json());

app.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;

    // Check if the response is cached
    const cachedResponse = cache.get(query);
    if (cachedResponse) {
      console.log(`Using cached response for query: ${query}`);
      return res.json(cachedResponse);
    }

    const questionsResponse = await axios.get('https://api.stackexchange.com/2.3/search', {
      params: {
        key: STACK_OVERFLOW_API_KEY,
        site: 'stackoverflow',
        order: 'desc',
        sort: 'activity',
        intitle: query
      }
    });

    const questionIds = questionsResponse.data.items.map(item => item.question_id);

    // Use Promise.allSettled for concurrent requests
    const answersPromises = questionIds.map(async (questionId) => {
      const answersResponse = await axios.get(`https://api.stackexchange.com/2.3/questions/${questionId}/answers`, {
        params: {
          key: STACK_OVERFLOW_API_KEY,
          site: 'stackoverflow',
          order: 'desc',
          sort: 'votes',
          filter: 'withbody'
        }
      });

      const answers = answersResponse.data.items.map(item => {
        const $ = cheerio.load(item.body);
        const answerText = $.root().text().trim();
        return {
          ownerName: item.owner.display_name,
          answer: answerText,
          profileimage: item.owner.profile_image
        };
      });
      return answers;
    });

    const allAnswers = await Promise.allSettled(answersPromises);
    const flattenedAnswers = allAnswers
      .filter(promiseResult => promiseResult.status === 'fulfilled')
      .map(promiseResult => promiseResult.value)
      .flat();

    // Cache the response with the query as the key
    cache.set(query, flattenedAnswers);

    res.json(flattenedAnswers);
  } catch (error) {
    console.error('Error fetching data from Stack Overflow API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
