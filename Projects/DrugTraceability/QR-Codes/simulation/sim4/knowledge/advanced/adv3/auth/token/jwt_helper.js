const jwt = require('jsonwebtoken')
const createError = require('http-errors');
const client = require('../../cache/redis');
const pool = require('../../database/database');

const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};             // Create a payload
        const secret = process.env.ACCESS_TOKEN_SECRET;      // Get the secret from the environment variables
        const options = {
            expiresIn: "1h",
            issuer: "medtrail.com",
            audience: userId
        };
        // console.log(`Signing access token for user ${userId}\n`);
        // Create a token
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                return reject(createError.InternalServerError());
            }
            // console.log(`Token for user ${userId} created successfully: ${token}\n`);
            resolve(token);
        });
    });
};

const verifyAccessToken = (req, res, next) => {
    // console.log('Verifying access token ...');
    if (!req.headers['authorization']) return next(createError.Unauthorized());

    console.log('Passed authorization check...');
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    // console.log('Verifying token ...');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
        if (err) {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(createError.Unauthorized(message));
        }

        req.payload = payload;
        const userId = payload.aud;
        
        try {
            // query the database to get the username based on the userId
            const userQuery = "SELECT username FROM users WHERE id = $1";
            const userResult = await pool.query(userQuery, [userId]);

            if (userResult.rows.length === 0) {
                return next(createError.Unauthorized('User not found'));
            }

            req.username = userResult.rows[0].username;
            next()
        } catch (error) {
            console.log(`Error verifying access token: ${error.message}`);
            return next(createError.InternalServerError());
        }
        // next();
    });
};

const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};             // Create a payload
        const secret = process.env.REFRESH_TOKEN_SECRET;      // Get the secret from the environment variables
        const options = {
            expiresIn: "1y",
            issuer: "medtrail.com",
            audience: userId
        };

        // console.log(`Client SR: ${JSON.stringify(client)}`);
        // console.log('Redis server:', client.options.socket.host + ':' + client.options.socket.port);

        // console.log(`\nSigning refresh token for user ${userId}\n`);
        // Create a token
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                return reject(createError.InternalServerError());
            }

            client.SET(userId, token, 'EX', 365*24*60*60, (err, reply) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                    return;
                }
                // console.log(`Token for user ${userId} stored in Redis successfully: ${reply}\n`);
                // resolve(token);
            });
            resolve(token);
            // console.log(`Token for user ${userId} created successfully\n`)
        });
    });
};

const verifyRefreshToken = async (refreshToken) => {
    try {
        if (!refreshToken) {
            throw createError.BadRequest('Missing refresh token');
        }

        const decodedToken = jwt.decode(refreshToken);

        if (!decodedToken || !decodedToken.aud) {
            throw createError.Unauthorized('Invalid refresh token');
        }

        const userId = decodedToken.aud;

        // console.log(`Verifying refresh token for user: ${userId}`);

        // Ensure client is initialized and connected
        if (!client.isOpen) {
            throw createError.InternalServerError('Redis client not connected');
        }

        try {
            const storedRefreshToken = await client.GET(userId);
            // console.log(`Stored refresh token for user ${userId}: ${storedRefreshToken}`);

            if (storedRefreshToken === refreshToken) {
                // console.log('Refresh token verified successfully');
                return userId;
            } else {
                // console.log('Refresh token mismatch');
                throw createError.Unauthorized('Refresh token mismatch');
            }
        } catch (err) {
            // console.error('Error verifying refresh token:', err);
            throw createError.InternalServerError('Failed to verify refresh token');
        }
    } catch (error) {
        throw error;
    }
};


module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}
