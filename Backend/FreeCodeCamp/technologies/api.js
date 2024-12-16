let express = require('express');
let app = express();

require('dotenv').config();

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

console.log("Hello World!");

app.use((req, res, next) => {
    const method = req.method;
    const path = req.path;
    const ip = req.ip;
    console.log(`${method} ${path} - ${ip}`);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    // res.send('Hello Express');
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
    const style = process.env.MESSAGE_STYLE;
    if (style === "uppercase") {
        res.json({
            "message": "HELLO JSON"
        })
    } else {
        res.json({
            "message": "Hello json"
        })
    }
});

app.get('/now', (req, res, next) => {
    req.time  = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        "time": req.time
    });
});

app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.json({
        "echo": word
    });
});

app.get('/name', (req, res) => {
    var firstName = req.query.first;
    var lastName = req.query.last;
    // var { first: firstName, last: lastName } = req.query;
    res.json({
        name: `${firstName} ${lastName}`
    });
});

app.post('/name', (req, res) => {
    let fullName = req.body.first + " " + req.body.last;
    res.json({
        "name": fullName
    });
});