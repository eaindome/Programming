const jwt = require('jsonwebtoken');

require('dotenv').config();

// middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            message: 'Forbidden Entry.'
        });
    }

    const bearerToken = token.split(' ')[1]     // extract token after 'Bearer '

    try {
        const decoded = jwt.verify(
            bearerToken,
            process.env.JWT_SECRET
        );
        
        // console.log(`user information: ${JSON.stringify(decoded)}`);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.code(401).send({
            message: 'Access Denied'
        });
    }
};

module.exports = {
    verifyToken
};