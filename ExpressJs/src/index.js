const express = require('express');
const cookieParser = require('cookie-parser');
const groceriesRoute = require('./routes/groceries');
const marketRoute = require('./routes/markets');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cookieParser());        // adding the installed cookie parser package to be used

// global middleware function for requests
app.use((req, res, next) => {
    console.log(req.url);
    console.log(`${req.method}: ${req.url}`);
    next();
});

// using the routes in the routes folder
// using prefix for the routes
app.use('/api/groceries', groceriesRoute);
app.use('/api/markets', marketRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));




