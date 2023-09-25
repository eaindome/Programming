const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/markets');
const authRoute = require('./routes/auth');
require('./database/init_db')

const app = express();
const PORT = 3001;



app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

/*
app.use((req, res, next) => {
    if (req.session.user) next();
    else {
        res.send(401);
    }
});*/

app.use('/api/v1/groceries', groceriesRoute);
app.use('/api/v1/markets', marketsRoute);
app.use('/api/v1/auth', authRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));