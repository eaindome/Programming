const express = require('express');
const dotenv =  require('dotenv');

const expandRoutes = require('./services/expand/routes');
const shortenRoutes = require('./services/shorten/routes');

dotenv.config();
const app = express();

// middleware to parse incoming JSON requests
app.use(express.json());

// entry point
app.get('/', (req, res) => {
    res.send('URL Shortening API service is running!');
});

// routes
app.use('/expand', expandRoutes);
app.use('/api', shortenRoutes);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(`Err: ${err.stack}`);
    res.status(500).send({
        message: 'Something went wrong.'
    });
});

module.exports = app;