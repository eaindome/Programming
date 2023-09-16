const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongoosedb');

// importing authentication routes
const AuthRoute = require('./Routes/auth.routes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());                          // pass the request body
app.use(express.urlencoded({extended: true}));  // to receive a form data

app.get('/', async(req, res, next) => {
    res.send('Hello from express');
});


// import 
app.use('/auth', AuthRoute);

// error handling if page not found
app.use(async (req, res, next) => {
    /*const error = new Error('Not found');
    //error.status = 404;
    //next(error);*/
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});