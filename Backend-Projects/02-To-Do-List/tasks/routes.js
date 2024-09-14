const { createTask, getTasks, updateTask } = require('./controller');
const { verifyToken } = require('../middleware/authMiddleware');

async function taskRoutes(fastify, options) {
    fastify.post('/api/task/create', { preHandler: [verifyToken] }, createTask);
    fastify.get('/api/task/get', { preHandler: [verifyToken] }, getTasks);
    fastify.put('/api/task/update/:id', { preHandler: [verifyToken] }, updateTask);
}

module.exports = taskRoutes;