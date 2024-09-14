const { createTask, getTasks } = require('./controller');
const { verifyToken } = require('../middleware/authMiddleware');

async function taskRoutes(fastify, options) {
    fastify.post('/api/task/create', { preHandler: [verifyToken] }, createTask);
    fastify.get('/api/task/get', { preHandler: [verifyToken] }, getTasks);
}

module.exports = taskRoutes;