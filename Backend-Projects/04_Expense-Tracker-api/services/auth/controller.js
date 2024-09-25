const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

// register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password required.'
        });
    }

    try {
        // check if user already exist
        const existingUser = await User.findOne({
            username
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists."
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new User({
            username,
            password: hashedPassword
        });

        // save user to the database
        await newUser.save();

        // return success response
        return res.status(201).json({
            message: 'User registered successfully.'
        });
    } catch (err) {
        console.err(`Error: ${err}`);
        res.status(500).json({
            message: `Server error: ${err}`
        });
    }
};

module.exports = {
    registerUser,
};