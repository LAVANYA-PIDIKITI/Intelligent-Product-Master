const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3002;
const STACK_OVERFLOW_API_KEY = 'FQBiDGX1lw9B6eZ2)BK6SA((';

// Connect to MongoDB
mongoose.connect('mongodb+srv://monicav1242003:Monica*12@cluster0.fypic3i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema for cached responses
const cachedResponseSchema = new mongoose.Schema({
  query: String,
  responses: [{
    ownerName: String,
    answer: String,
    profileimage: String
  }]
});
const CachedResponse = mongoose.model('CachedResponse', cachedResponseSchema);

app.use(cors());
app.use(express.json());

app.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;

    // Check if the response is cached in the database
    const cachedResponse = await CachedResponse.findOne({ query });
    if (cachedResponse) {
      console.log(`Using cached response for query: ${query}`);
      return res.json(cachedResponse.responses);
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
      try {
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
      } catch (error) {
        console.error('Error fetching answers:', error);
        return []; // Return an empty array in case of an error
      }
    });

    const allAnswers = await Promise.allSettled(answersPromises);
    const flattenedAnswers = allAnswers
      .filter(promiseResult => promiseResult.status === 'fulfilled')
      .map(promiseResult => promiseResult.value)
      .flat();

    // Cache the response in the database
    const newCachedResponse = new CachedResponse({
      query,
      responses: flattenedAnswers
    });
    await newCachedResponse.save();

    res.json(flattenedAnswers);
  } catch (error) {
    console.error('Error fetching data from Stack Overflow API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port ${PORT}`);
});

//mongodb+srv://monicav1242003:Monica*12@cluster0.fypic3i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0