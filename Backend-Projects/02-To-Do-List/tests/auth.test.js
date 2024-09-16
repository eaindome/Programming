const request = require('supertest');
const fastify = require('fastify');
const authRoutes = require('../auth/routes');
const { sequelize } = require('../config/database');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// create a fastify instance for testing
let app;

beforeAll(async () => {
    app = fastify();
    try {
        console.log("Entering...");
        await sequelize.sync({
            force: true
        });
        console.log("Working!");
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
        process.exit();
    }

    try {
        console.log("Entering 2...");
        app.register(authRoutes);
        console.log("Working 2!");
    } catch (err) {
        console.error(`Error registering routes: ${err}`);
        process.exit();
    }

    await app.ready();
});

afterAll(async () => {
    console.log("After all...")
    await sequelize.close();
    await app.close();
});

describe('Registration Process', () => {
    test(
        'POST /api/auth/register should register a new user successfully',
        async () => {
            const newUser = {
                username: 'TestUser',
                password: 'test@password'
            };
            const response = await request(app.server).post('/api/auth/register').send(newUser);
            expect(response.status).toBe(201);
            expect(response.body.username).toBe('TestUser');
        }
    );

    test(
        'POST /api/auth/register should fail if username already exists',
        async () => {
            // create a user to simulate existing user
            await User.create({
                username: 'ExistingUser',
                password: 'test2@password'
            });

            const duplicateUser = {
                username: 'ExistingUser',
                password: 'test2@password'
            };
            const response = await request(app.server).post('/api/auth/register').send(duplicateUser);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username already exists.');
        }
    );

    test(
        'POST /api/auth/register should fail if username or password is empty',
        async () => {
            const incompleteUser = {
                username: '',
                password: ''
            };
            const response = await request(app.server).post('/api/auth/register').send(incompleteUser);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username and password are required.');
        }
    );
});

describe('Login Process', () => {
    beforeEach(async () => {
        try {
            // create a user to test login
            await User.create({
                username: 'LoginUser',
                password: await bcrypt.hash('testLogin@password', 10)
            });
        } catch (err) {
            console.error(`Error creating user: ${err}`)
        }
    });

    test(
        'POST /api/auth/login should login a user successfully',
        async () => {
            const loginDetails = {
                username: 'LoginUser',
                password: 'testLogin@password'
            };
            const response = await request(app.server).post('/api/auth/login').send(loginDetails);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful!');
            expect(response.body.token).toBeDefined();
        }
    );

    test(
        'POST /api/auth/login should fail with incorrect password',
        async () => {
            const loginDetails = {
                username: 'LoginUser',
                password: 'wrongpassword'
            };
            const response = await request(app.server).post('/api/auth/login').send(loginDetails);
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid username or password.');
        }
    );

    test(
        'POST /api/auth/login should fail with non-existend user',
        async () => {
            const loginDetails = {
                username: 'NonExistentUser',
                password: 'test@password'
            };
            const response = await request(app.server).post('/api/auth/login').send(loginDetails);
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid username or password.");
        }
    );

    test(
        'POST /api/auth/login should fail with missing fields',
        async () => {
            const loginDetails = {
                username: '',
                password: ''
            };
            const response = await request(app.server).post('/api/auth/login').send(loginDetails);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username and password are required.');
        }
    );
});


// describe('OAuth Authentication Proces', () => {
//     test(
//         'GET /api/auth/google should redirect to Google',
//         async () => {
//             console.log('Google Authentication test...');
//             const response = await request(app.server)
//                 .get('/api/auth/google');

//             console.log(`response: ${JSON.stringify(response)}`);
//             expect(response.status).toBe(302);
//             expect(response.headers.location).toContain('accounts.google.com');
//         }
//     );
// });
