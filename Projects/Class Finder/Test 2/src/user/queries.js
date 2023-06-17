const userLogin = 'SELECT * FROM User WHERE "username" = $1 AND "password" = $2';





module.exports = {
    userLogin,
};