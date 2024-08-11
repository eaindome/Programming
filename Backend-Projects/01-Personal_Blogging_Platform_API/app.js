const fastify = require('fastify')({
    logger: true
});
const articleRoutes = require('./routes/articleRoutes');
const { connectDB } = require('./config/database');

// register routes
fastify.register(articleRoutes);

// start the server and connect to the database
const start = async () => {
    try {
        await connectDB();
        await fastify.listen({
            port: 3000
        });
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

module.exports = start;