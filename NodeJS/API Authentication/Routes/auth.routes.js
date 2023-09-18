const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../Models/user.model');
const { authSchema } = require('../helpers/validation_schema');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper');
const { verify } = require('jsonwebtoken');

// route for registration or signup process
router.post('/register', async (req, res, next) => {

    //res.send('register route')
    try {
        // const { email, password } = req.body;
        // if (!email || !password) throw createError.BadRequest();
        const result = await authSchema.validateAsync(req.body);

        const doesExist = await User.findOne({ email: result.email });
        if (doesExist) throw createError.Conflict(`${result.email} is already been registered`);

        const user = new User(result);              // User({ email,password });
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);
        const refreshToken = await signRefreshToken(savedUser.id);

        res.send({ accessToken, refreshToken });
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
});

// route for login process
router.post('/login', async (req, res, next) => {
    // res.send('login route')
    try{
        const result = await authSchema.validateAsync(req.body);
        const user = await User.findOne({ email: result.email });

        if (!user) throw createError.NotFound('User not registered.');

        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) throw createError.Unauthorized('Username/Password is not valid');

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.send({ accessToken, refreshToken });
    } catch (error) {
        if (error.isJoi === true) 
            return next(createError.BadRequest('Invalid Username/Password'));
        next(error);
    }
});

// route to send refresh token
router.post('/refresh-token', async (req, res, next) => {
    // res.send('refresh-token route')
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);

        res.send({ accessToken: accessToken, refreshToken: refToken });
    } catch (error) {
        next(error);
    }
});

// route for logout process
router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
});





module.exports = router;