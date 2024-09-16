const { registerUser, loginUser } = require('./controller');
// const passport = require('passport');

async function authRoutes(fastify, options) {
    fastify.post('/api/auth/register', registerUser);
    fastify.post('/api/auth/login', loginUser);

    // // Google authentication - Custom handler to manage Fastify lifecycle
    // fastify.get('/api/auth/google', async (req, reply) => {
    //     passport.authenticate('google', { scope: ['profile', 'email'] })(req.raw, reply.raw, (err) => {
    //         if (err) {
    //             reply.code(500).send({ message: 'Google Authentication failed' });
    //         }
    //     });
    // });

    // // Google callback handling
    // fastify.get('/api/auth/google/callback', async (req, reply) => {
    //     passport.authenticate('google', { failureRedirect: '/api/auth/login' })(req.raw, reply.raw, (err) => {
    //         if (err) {
    //             reply.code(500).send({ message: 'Google Authentication callback failed' });
    //         } else {
    //             // Successful authentication
    //             reply.code(200).send({ message: 'Successfully authenticated with Google' });
    //         }
    //     });
    // });
}

module.exports = authRoutes;