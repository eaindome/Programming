const { Router } = require('express');
const User = require('../database/schemas/user_schemas');
const { hashPassword, comparePassword } = require('./helpers');

const router = Router();


router.post('/login', async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) return response.status(400);
    const userDB = await User.findOne({ email })
    if (!userDB) return response.send(401);
    const isValid = comparePassword(password, userDB.password);
    if (isValid) {
        console.log('Authenticated successfully!');
        request.session.user = userDB;
        return response.send(200);
    } else {
        //console.log('Failed to Authenticate.')
        return response.send(401)
    }
});

router.post('/register', async (request, response) => {
    const { email } = request.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
        response.status(400).send({ msg: 'User already existes!' });
    } else {
        const password = hashPassword(request.body.password);
        const newUser = User.create({ username, password, email });
        response.send(201);
    }
});

module.exports = router;