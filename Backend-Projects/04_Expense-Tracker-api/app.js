const express = require('express');
const authRoutes = require('./services/auth/routes');
const userRoute = require('./services/user/routes');

const app = express();

// middleware to parse incoming JSON requests
app.use(express.json());

// entry point
app.get('/', (req, res) => {
    res.send('Expense Tracker API is running!');
});

// Routes
// auth routes
app.use('/api/auth', authRoutes);

// user route
app.use('/api/user', userRoute);

module.exports = app;