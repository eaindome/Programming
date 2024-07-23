const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const insertPasswordResetToken = "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)";
const getPasswordResetToken = "SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()";
const updatePassword = "UPDATE users SET password = $1 WHERE id = $2";
const deletePasswordResetToken = "DELETE FROM password_reset_tokens WHERE token = $1";

module.exports = {
    getUserByEmail,
    insertPasswordResetToken,
    getPasswordResetToken,
    updatePassword,
    deletePasswordResetToken,
};