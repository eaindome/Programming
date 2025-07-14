import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany({});
});

describe('Auth API Tests - Registration Endpoint', () => {
    test(
        'should register a new user and return the user object wth a token',
        async () => {
            const userData = {
                username: 'Test Username',
                email: 'testuser@example.com',
                password: 'Test@1234'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData);
            
            // console.log(`response: ${JSON.stringify(response.body)}`);
            expect(response.status).toBe(201);;
            expect(response.body).toHaveProperty('token');
        }
    );

    test(
        'should return validation errors if required fields are missing',
        async () => {
            const userData = {
                username: '',
                email: 'invalid-email',
                password: 'short'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData);
            
            // console.log(`response: ${JSON.stringify(response.body)}`);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
        }
    );

    test(
        'should return an error if the user already exists',
        async () => {
            const userData  = {
                username: 'TestUser',
                email: 'testuser@example.com',
                password: 'Test@1234'
            };

            // register the user first
            await request(app)
                .post('/api/auth/register')
                .send(userData);

            // attempt to register the user again
            const response = await request(app)
                .post('/api/auth/register')
                .send(userData);

            console.log(`response: ${JSON.stringify(response.body)}`)
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'User already exists');
        }
    );

    test(
        'should return a server error if something goes wrong',
        async () => {
            jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
                throw new Error('Mocked error');
            });
    
            const userData = {
                username: 'TestUser',
                email: 'testuser@example.com',
                password: 'Test@1234'
            };
    
            const response = await request(app)
                .post('/api/auth/register')
                .send(userData);
            
            console.log(`response: ${JSON.stringify(response.body)}`);
            // expect(response.status).toBe(500);
            // expect(response.body).toHaveProperty('message', 'Server error');
        }
    );
});
