const express = require('express');

const app = express();

// middleware to parse incoming JSON requests
app.use(express.json());

// entry point
app.get('/', (req, res) => {
    res.send('Expense Tracker API is running!');
});

module.exports = app;