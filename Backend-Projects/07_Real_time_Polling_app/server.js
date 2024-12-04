const http = require('node:http');
const url = require('node:url');
const { initializeSocket } = require('./utilities/socket');
const { createPoll, getPoll, getPollResults, voteOnPoll } = require('./handlers/handlers');
const { sendJsonResponses } = require('./utilities/helpers');

// route dispatcher 
const router = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const pathname = parsedUrl.pathname;

    if (method === 'POST' && pathname === '/polls') {
        await createPoll(req, res);
    } else if (method === 'GET' && pathname.startsWith('/polls/')) {
        const parts = pathname.split('/');
        const pollId = parts[2];

        if (parts.length === 3) {
            getPoll(req, res, pollId);
        } else if (parts.length === 4 && parts[3] === 'results') {
            getPollResults(req, res, pollId);
        }
    } else if (method === 'POST' && pathname.endsWith('/vote')) {
        const pollId = pathname.split('/')[2];
        await voteOnPoll(req, res, pollId);
    } else { 
        sendJsonResponses(res, 404, { message: 'Route not found' });
    }
};

// create and start server
const server = http.createServer(router);

// attach socket.io to the server
initializeSocket(server);

// listen on port
const PORT = process.env.PORT ?? 3000;
server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
