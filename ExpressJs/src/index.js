const express = require('express');
const cookieParser = require('cookie-parser');
const groceriesRoute = require('./routes/groceries');
const marketRoute = require('./routes/markets');
const session = require('express-session');
const authRoute = require('./routes/auth');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cookieParser());        // adding the installed cookie parser package to be used
app.use(session({
    secret: 'Aai@4148216',
    resave: false,
    saveUninitialized: false
}));

// global middleware function for requests
app.use((req, res, next) => {
    console.log(req.url);
    console.log(`${req.method}: ${req.url}`);
    next();
});

// middleware to check if user already has a session
app.use((request, response, next) => {
    console.log(`${request.method}:${request.url}`);
    next();
});

app.use((request, response, next) => {
    if (request.session.user) next();
    else {
        res.send(401);
    }
});

// using the routes in the routes folder
// using prefix for the routes
app.use('/api/groceries', groceriesRoute);
app.use('/api/markets', marketRoute);
app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));




