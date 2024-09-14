const { registerUser, loginUser } = require('./controller');

async function authRoutes(fastify, options) {
    fastify.post('/api/auth/register', registerUser);
    fastify.post('/api/auth/login', loginUser);
}

module.exports = authRoutes;