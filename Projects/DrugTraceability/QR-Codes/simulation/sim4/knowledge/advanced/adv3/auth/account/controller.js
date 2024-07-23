const pool = require('../../database/database'); // assuming you have a pool instance for PostgreSQL connection
const { createAccount } = require('./queries');

// Controller to update user account
const updateAccount = async (req, res) => {
    const username = req.username;
    const { account, private_key } = req.body;

    // Validate input
    if (!account || !username) {
        return res.status(400).json({ error: 'Account information and username are required' });
    }

    try {
        // Update account
        const results = await pool.query(createAccount, [account, private_key, username]);

        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Account updated successfully' });
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Error updating account' });
    }
};

module.exports = {
    updateAccount
};

