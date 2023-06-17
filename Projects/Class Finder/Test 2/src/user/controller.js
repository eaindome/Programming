const pool = require('../database');
const queries = require('./queries');


// Endpoint: User Login
const userLogin = (req, res) => {
    const { email, password } = req.body;

    pool.query(queries.userLogin, [email, password], (error, results) => {
        if (error) {
            console.error('Error executing query: ', error);
            res.status(500).json({ eroor: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            const user = results.rows[0];
            // store the user's ID in the session
            req.session.userid = user.userid;
            req.session.user = {
                user_id: use.user_id,
                username: user.username,
                role: user.role,
            };
            res.status(200).json({ message: 'Login successful', user});
        }
    });
};

//  Endpoint: User Profile
const userProfile = (req, res) => {
    // assume the user information is stored in the request object after successful login
    // check if the user is authenticated (sessoin validation)
    if (!req.session.userid) {
        return res.status(401).json({ error: 'User not logged in' });
    }

    const user = req.session.user;

    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    pool.query(queries.userProfile, [id], (error, results) => {
        if (error) {
            console.error('Error execution query: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const userProfile = results.rows[0];
            res.status(200).json(userProfile);
        }
    });
};










module.exports = {
    userLogin,
    userProfile,
};