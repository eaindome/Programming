// Query strings for the auth module

const addUser = "INSERT INTO users (username, password, role, email) VALUES ($1, $2, $3, $4) RETURNING id";

const confirmUser = "SELECT * FROM users WHERE username = $1";

const updateUser = 'UPDATE users SET account = $1, private_key = $2 WHERE username = $3';

module.exports = {
    addUser,
    confirmUser,
    updateUser
}

