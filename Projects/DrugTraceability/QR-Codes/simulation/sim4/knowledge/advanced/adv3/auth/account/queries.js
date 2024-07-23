// query strings for account

// const addAccount = "INSERT INTO users (account) VALUES ($1)";

const createAccount = "UPDATE users SET account = $1, private_key = $2 WHERE username = $3";

module.exports = {
    createAccount
}