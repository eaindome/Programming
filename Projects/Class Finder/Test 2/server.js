const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./src/user/routes')
const classRoutes = require('./src/classes/routes')
//const upcomingClasses = require('./src/classes/upcomingClasses/routes');
const classStatus = require('./src/classes/classStatus/routes');
const upcomingClasses = require('./src/classes/upcomingClasses/routes');

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

// Mount userRoutes and classRoutes
app.use("/api/v1/src/user", userRoutes);
app.use("/api/v1/src/classes", classRoutes);
app.use("/api/v1/src/classes/classStatus", classStatus);
app.use("/api/v1/src/classes/upcomingClasses", upcomingClasses);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});

