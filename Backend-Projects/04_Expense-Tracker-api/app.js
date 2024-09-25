const express = require('express');
const authRoutes = require('./services/auth/routes');

const app = express();

// middleware to parse incoming JSON requests
app.use(express.json());

// entry point
app.get('/', (req, res) => {
    res.send('Expense Tracker API is running!');
});

// Routes
// auth routes
app.use('/api/auth/register', authRoutes);

module.exports = app;