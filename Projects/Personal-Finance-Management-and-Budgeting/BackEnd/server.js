const express = require("express");
//const bodyParser = require("body-parser");
//const session = require("express-session");
//const pgSession = require("connect-pg-simple")(session);


// import routes


const app = express();
const port = 3000;

//app.use(bodyParser.json());

// configure session
//app.use();

// mount routes


// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});
