const request = require('supertest');
const fastify = require('fastify');
const authRoutes = require('../auth/routes')
const taskRoutes = require('../tasks/routes');
const { sequelize } = require('../config/database');
const Task = require('../models/Tasks');
const jwt = require('jsonwebtoken');

// create a fastify instance for testing
let app;

beforeAll(async () => {
    app = fastify();
    try {
        // console.log("Entering...");
        await sequelize.sync({
            force: true
        });
        // console.log("Working!");
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
        process.exit();
    }

    try {
        // console.log("Entering 2...");
        app.register(authRoutes);
        app.register(taskRoutes);
        // console.log("Working 2!");
    } catch (err) {
        console.error(`Error registering routes: ${err}`);
        process.exit();
    }

    await app.ready();
});

afterAll(async () => {
    // console.log("After all...")
    await sequelize.close();
    await app.close();
});

describe('Task Creation Process', () => {
    let token;

    beforeAll(async () => {
        const userCredentials = {
            username: 'TestUser',
            password: 'testpassword'
        };

        await request(app.server)
            .post('/api/auth/register')
            .send(userCredentials);

        const loginResponse = await request(app.server)
            .post('/api/auth/login')
            .send(userCredentials);

        token = loginResponse.body.token;
    });

    test(
        'POST /api/task/create should create a new task successfully',
        async () => {
            const newTask = {
                title: 'Test Task',
                description: 'This is a test task description'
            };
            const response = await request(app.server)
                .post('/api/task/create')
                .set('Authorization', `Bearer ${token}`)
                .send(newTask);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Task successfully created.');
        }
    );

    test(
        'POST /api/task/create should fail if no token is provided',
        async () => {
            const newTask = {
                title: 'Another Test Task',
                description: 'This is another test task description'
            };
            const response = await request(app.server)
                .post('/api/task/create')
                .send(newTask);
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden Entry.');
        }
    );

    test(
        'POST /api/task/create should fail if title is missing',
        async () => {
            const newTask = {
                description: 'Task withot a title'
            };
            const response = await request(app.server)
                .post('/api/task/create')
                .set('Authorization', `Bearer ${token}`)
                .send(newTask);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Title field is required.');
        }
    );
});