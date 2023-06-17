const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./src/user/routes')

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configure session
app.use(
    session({
        secret: 'your-secret-session',
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/api/v1/src/user", userRoutes)

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});