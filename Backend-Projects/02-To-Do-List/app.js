const fastify = require('fastify')({
    logger: true
});
const authRoutes = require('./auth/routes');

const { connectDB } = require('./config/database');

// register auth routes
fastify.register(authRoutes);

// start the server and connect to the database
const start = async () => {
    try {
        await connectDB();
        await fastify.listen({
            port: 3000
        });
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(`Error starting the server: ${err}`);
        process.exit(1);
    }
};

module.exports = start;