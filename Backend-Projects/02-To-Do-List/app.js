const fastify = require('fastify')({
    logger: true
});


const { connectDB } = require('./config/database');

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