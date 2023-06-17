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
            res.status(200).json({ message: 'Login successful', user})
        }
    });
};










module.exports = {
    userLogin,
};