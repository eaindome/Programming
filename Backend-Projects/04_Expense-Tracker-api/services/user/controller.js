const User = require('../../models/userModel');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).send({
            message: 'User not found.'
        });
        return res.status(200).send(user);
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: `Server Error: ${err}`
        });
    }
};

module.exports = { getUserProfile };