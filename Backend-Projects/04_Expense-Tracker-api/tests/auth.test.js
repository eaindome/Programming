const request = require('supertest');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const User = require('../models/userModel');
const app = require('../app');

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    // disconnect from the database after the tests are done
    await mongoose.connection.close();
});

afterEach(async () => {
    // clean up the test data after each test
    await User.deleteMany({});
});

describe('Registration Process', () => {
    test(
        'POST /api/auth/register should register a new user successfully',
        async () =>{
            const newUser = {
                username: 'TestUser1',
                password: 'test1@password'
            };

            const response = await request(app).post('/api/auth/register').send(newUser);
            // console.log(`Response: ${JSON.stringify(response)}`);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully.');
        }
    );

    test(
        'POST /api/auth/register should fail if username already exists',
        async () => {
            // create user to simulate existing user
            await User.create({
                username: 'ExistingUser',
                password: 'test2@password'
            });

            const duplicateUser = {
                username: 'ExistingUser',
                password: 'test2@password'
            };

            const response = await request(app).post('/api/auth/register').send(duplicateUser);
            // console.log(`Response: ${response}`);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists.')
        }
    );

    test(
        'POST /api/auth/register should fail if username or password is empty',
        async () => {
            const incompleteUser = {
                username: '',
                password: ''
            };

            const response = await request(app).post('/api/auth/register').send(incompleteUser);
            // console.log(`Response: ${response}`);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username and password required.');
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

    // test(
    //     'POST /api/auth/login should login a user successfully',
    //     async () => {
    //         const loginDetails = {
    //             username: 'LoginUser',
    //             password: 'testLogin@password'
    //         };
    //         const response = await request(app.server).post('/api/auth/login').send(loginDetails);
    //         expect(response.status).toBe(200);
    //         expect(response.body.message).toBe('Login successful!');
    //         expect(response.body.token).toBeDefined();
    //     }
    // );

    // test(
    //     'POST /api/auth/login should fail with incorrect password',
    //     async () => {
    //         const loginDetails = {
    //             username: 'LoginUser',
    //             password: 'wrongpassword'
    //         };
    //         const response = await request(app.server).post('/api/auth/login').send(loginDetails);
    //         expect(response.status).toBe(401);
    //         expect(response.body.message).toBe('Invalid username or password.');
    //     }
    // );

    // test(
    //     'POST /api/auth/login should fail with non-existend user',
    //     async () => {
    //         const loginDetails = {
    //             username: 'NonExistentUser',
    //             password: 'test@password'
    //         };
    //         const response = await request(app.server).post('/api/auth/login').send(loginDetails);
    //         expect(response.status).toBe(401);
    //         expect(response.body.message).toBe("Invalid username or password.");
    //     }
    // );

    // test(
    //     'POST /api/auth/login should fail with missing fields',
    //     async () => {
    //         const loginDetails = {
    //             username: '',
    //             password: ''
    //         };
    //         const response = await request(app.server).post('/api/auth/login').send(loginDetails);
    //         expect(response.status).toBe(400);
    //         expect(response.body.message).toBe('Username and password are required.');
    //     }
    // );
});