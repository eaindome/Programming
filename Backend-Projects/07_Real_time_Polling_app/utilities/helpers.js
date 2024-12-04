// helper to send JSON responses
const sendJsonResponses = (res, statusCode, data) => {
    res.writeHead(
        statusCode,
        {
            'Content-Type': 'application/json'
        }
    );
    res.end(JSON.stringify(data));
};

// helper to parse request body
const parseRequestBody = (req) => {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            resolve(body ? JSON.parse(body) : {});
        });
    });
}

module.exports = {
    sendJsonResponses,
    parseRequestBody
}