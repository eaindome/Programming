const bcrypt =  require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.code(400).send({
            message: "Username and password are required."
        });
    }

    try {
        // check if username exists
        const existingUser = await User.findOne({
            where: { username }
        });

        if (existingUser) {
            return res.status(400).send({
                message: "Username already exists."
            });
        }

        // if username doesn't exist
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        // respond with user data without password
        return res.status(201).send({
            id: newUser.id,
            username: newUser.username,
            createdAt: newUser.createdAt,
        });
    } catch (err) {
        // console.log(`Error: ${err}`);
        // console.error(`Server error: ${err}`);
        return res.code(500).send({
            message: 'Server error', err
        });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            message: "Username and password are required."
        })
    }

    try {
        // check if the username exists
        const user = await User.findOne({
            where: { username: username }
        });

        if (!user) {
            return res.status(401).send({
                message: "Invalid username or password."
            });
        }

        // check if password is valid
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).send({
                message: "Invalid username or password."
            });
        }

        // generate a JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).send({
            message: 'Login successful!',
            token
        })
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: `Server error: ${err}`
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};