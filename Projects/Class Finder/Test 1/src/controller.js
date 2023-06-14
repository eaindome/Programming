const pool = require('../database');
const queries = require('./queries');


const userLogin = (req, res) => {
    const { email, password } = req.body;

    pool.query(queries.userLogin, [email, password], (error, results) => {
        if (error) {
            console.error('Error execution query: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            const user = results.rows[0];
            res.status(200).json({ message: 'Login successful', user }); // This also prints out the user's profile
        }
    });
};


const userProfile = (req, res) => {
    // assume user information is stored in the request object after successful login
    const user = req.user;

    pool.query(queries.userProfile, [user.UserID], (error, results) => {
        if (error) {
            console.error('Error executing query: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const userProfile = results.rows[0];
            res.status(200).json(user);
        }
    });
};

/*
// Get logged-in user's profile
const userProfile = (req, res) => {
    // assume user information is stored in the request object after successful login
    const user = req.user;
    res.status(200).json(user);
};
*/

/*
const upcomingClass = (req, res) => {
    // assume user information is stored in the request object after successful login
    const user = req.user;

    pool.query(queries.upcomingClass, [user.UserID], (error, results) => {
        if (error) {
            console.error('Error executing query: ', error);
            res.status(500).json({ error: 'Internal Server Error'})
        } else {
            const upcomingClass = results.rows;
            res.status(200).json(upcomingClass);
        }
    });
};
*/

module.exports = {
    userLogin,
    userProfile,
    // upcomingClass,
};

