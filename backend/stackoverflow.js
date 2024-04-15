const axios = require('axios');
const zlib = require('zlib');

const httpClient = axios.create({
    headers: {
        'Accept-Encoding': 'gzip',
    },
});

async function getAnswersForQuery(query) {
    const searchURL = 'https://api.stackexchange.com/2.3/search';
    const searchParams = {
        site: 'stackoverflow',
        order: 'desc',
        sort: 'votes',
        intitle: query,
    };

    try {
        const searchResponse = await httpClient.get(searchURL, {
            params: searchParams,
            responseType: 'arraybuffer',
        });

        const searchData = JSON.parse(zlib.gunzipSync(searchResponse.data).toString());

        const questionIDs = searchData.items.map(item => item.question_id);
        const answers = [];

        for (const questionId of questionIDs) {
            const answerURL = `https://api.stackexchange.com/2.3/questions/${questionId}/answers`;
            const answerParams = {
                site: 'stackoverflow',
                order: 'desc',
                sort: 'votes',
            };

            try {
                const answerResponse = await httpClient.get(answerURL, {
                    params: answerParams,
                    responseType: 'arraybuffer',
                });

                const answerData = JSON.parse(zlib.gunzipSync(answerResponse.data).toString());

                for (const answer of answerData.items) {
                    const answerID = answer.answer_id;
                    const answerContentURL = `https://api.stackexchange.com/2.3/answers/${answerID}`;
                    const answerContentParams = {
                        site: 'stackoverflow',
                        filter: 'withbody',
                    };

                    try {
                        const answerContentResponse = await httpClient.get(answerContentURL, {
                            params: answerContentParams,
                            responseType: 'arraybuffer',
                        });

                        const answerContentData = JSON.parse(zlib.gunzipSync(answerContentResponse.data).toString());

                        const answerBody = answerContentData.items[0].body;
                        answers.push({
                            Author: answer.owner.display_name,
                            Body: answerBody,
                        });
                    } catch (error) {
                        console.error('Error fetching answer content:', error.message);
                    }
                }
            } catch (error) {
                console.error('Error fetching answers:', error.message);
            }
        }

        return answers;
    } catch (error) {
        console.error('Error fetching search results:', error.message);
        return [];
    }
}

// Example usage:
const query = 'your_search_query';
getAnswersForQuery(query)
    .then(answers => console.log('Answers:', answers))
    .catch(error => console.error('Error:', error.message));
