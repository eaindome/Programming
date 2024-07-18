const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./auth');
require('dotenv').config();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
};

const app = express();
const bodyParser = require('body-parser');
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
});

app.get('/auth/google', 
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        res.redirect('/protected');
    }
);

app.get('/auth/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

// Redirect to Google OAuth
app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello, ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        req.session.destroy(err => {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });
});

// Redirect to Google OAuth
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});