const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

let user = {
    id: "abcdefghijkl",
    email: "johndoe@gmail.com",
    password: "mnopqrstuvwxyz"
};

const JWT_SECRET = 'some super secret ...'

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password');
});

app.post('/forgot-password', (req, res, next) => {
    const { email } = req.body;

    // make sure user exist in the database
    if (email !== user.email) {
        res.send('user not registered');
        return;
    }

    // user exist, create a One time link valid for 15 mins
    const secret = JWT_SECRET + user.password;
    const payload = {
        email: user.email,
        id: user.id
    }
    const token = jwt.sign(payload, secret, {expiresIn: '15m'});
    const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
    console.log(link);
    res.send('Password reset link has been sent to ur email...');
});

app.get('/reset-password/:id/:token', (req, res, next) => {
    const { id, token } = req.params;
    
    // check if the id exist in the database
    if (id !== user.id) {
        res.send('Invalid id...');
        return;
    }

    // we have a valid user with the id
    const secret = JWT_SECRET + user.password;
    try {
        const payload = jwt.verify(token, secret);
        res.render('reset-password', {email: user.email});
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
});

app.post('/reset-password/:id/:token', (req, res, next) => {
    const { id, token } = req.params;
    const { password, password2 } = req.body;

    // check if the id exist in the database
    if (id !== user.id) {
        res.send('Invalid id...');
        return;
    }

    const secret = JWT_SECRET + user.password;
    try {
        const payload = jwt.verify(token, secret);
        // validate password and password2 should match

        // find the user with the payload email and id, and update with new password
        // hash password before saving
        user.password = password;
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
});

app.listen(3000, () => console.log('http://localhost:3000'));