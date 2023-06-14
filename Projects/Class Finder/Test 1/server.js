const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.use("/api/v1/src", userRoutes)

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});