const { io } = require('../utilities/socket');
const {
    parseRequestBody,
    sendJsonResponses
} = require('../utilities/helpers');

// sample in-memory database
const polls = {};
let pollIdCounter = 1;

// handler for creating new poll
const createPoll = async (req, res) => {
    try {
        const { question, options } = await parseRequestBody(req);

        if (!question || !options) {
            sendJsonResponses(res, 400, { message: 'Invalid input: question and options is required' });
        }

        if (!Array.isArray(options)) {
            sendJsonResponses(res, 400, { message: 'Invalid input: options must be an array.' });
        }
        const pollId = pollIdCounter++;

        // store in sample database
        polls[pollId] = {
            question,
            options,
            votes: Array(options.length).fill(0)
        }

        sendJsonResponses(res, 201, { pollId });
    } catch (err) {
        console.error(`Error: ${err}`);
        sendJsonResponses(res, 500, { message: 'Internal Server Error' });
    }    
};

// handler for fetching poll details
const getPoll = (req, res, pollId) => {
    try {
        const poll = polls[pollId];

        if (poll) {
            sendJsonResponses(res, 200, poll);
        } else {
            sendJsonResponses(res, 404, { message: 'Poll not found' });
        }
    } catch (err) {
        console.error(`Error: ${err}`);
        sendJsonResponses(res, 500, { message: 'Internal Server Error' });
    }
};

// handler for getting poll results
const getPollResults = (req, res, pollId) => {
    try {
        const poll = polls[pollId];

        if (poll) {
            sendJsonResponses(res, 200, { question: poll.question, votes: poll.votes });
        } else {
            sendJsonResponses(res, 404, { message: 'Poll not found' })
        }
    } catch (err) {
        console.error(`Error: ${err}`);
        sendJsonResponses(res, 500, { message: 'Internal Server Error' });
    }
};

// handler for voting on poll
const voteOnPoll = async (req, res, pollId) => {
    try {
        const poll = polls[pollId];

        if (!poll) {
            sendJsonResponses(res, 404, 'Poll not found.');
            return;
        }

        const { optionIndex } = await parseRequestBody(req);

        if (optionIndex >= 0 && optionIndex < poll.options.length) {
            poll.votes[optionIndex]++;

            io.to(pollId).emit('voteUpdate', poll);

            sendJsonResponses(res, 200, { message: 'Vote counted.' });
        } else {
            sendJsonResponses(res, 400, { message: 'Invalid option.' });
        }
    } catch (err) {
        console.error(`Error: ${err}`);
        sendJsonResponses(res, 500, { message: 'Internal Server Error.' });
    }
};

module.exports = {
    createPoll,
    getPoll,
    getPollResults,
    voteOnPoll
}