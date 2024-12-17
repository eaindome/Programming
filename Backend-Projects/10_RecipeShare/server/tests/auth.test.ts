import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/db';

const api = request(app);

describe('Authentication Endpoints', () => {
    beforeAll(async () => {
        // clean up user table before running tests
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        // disconnect prisma after tests
        await prisma.$disconnect();
    });

    const userCredentials = {
        email: 'testuser@example.com',
        password: 'TestPassword123!',
    };

    describe('POST /api/auth/signup', () => {
        it('should create a new user and return 201 status', async () => {
            const response = await api.post('/api/auth/signup').send(userCredentials);
            expect(response.status).toBe(201);
        });

        it('should return 400 if email is missing', async () => {
            const response = await api.post('/api/auth/signup').send({ password: userCredentials.password });
            // console.log(`response: ${JSON.stringify(response)}`);
            expect(response.status).toBe(400);
        });

        it('should return 400 if password is missing', async () => {
            const response = await api.post('/api/auth/signup').send({ email: userCredentials.email });
            // console.log(`response: ${JSON.stringify(response)}`);
            expect(response.status).toBe(400);
        });

        it('should return 400 if email format is invalid', async () => {
            const response = await api.post('/api/auth/signup').send({ email: 'invalid-email', password: userCredentials.password });
            expect(response.status).toBe(400);
        });

        it('should return 400 if password is weak', async () => {
            const response = await api.post('/api/auth/signup').send({ email: userCredentials.email, password: '123' });
            expect(response.status).toBe(400);
        });

        it('should return 409 if email already exists', async () => {
            await api.post('/api/auth/signup').send(userCredentials);
            const response = await api.post('/api/auth/signup').send(userCredentials);
            expect(response.status).toBe(409);
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Ensure the user is created before each login test
            await api.post('/api/auth/signup').send(userCredentials);
        });

        it('should log in an existing user and return a JWT', async () => {
            const response = await api.post('/api/auth/login').send(userCredentials);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 401 status for invalid credentials', async () => {
            const invalidCredentials = {
                email: userCredentials.email,
                password: 'WrongPassword123!',
            };

            const response = await api.post('/api/auth/login').send(invalidCredentials);
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error', 'Invalid credentials');
        });

        it('should return 400 status if required fields are missing', async () => {
            const incompleteCredentials = { email: userCredentials.email };
            const response = await api.post('/api/auth/login').send(incompleteCredentials);

            expect(response.status).toBe(400);
        });
    });
});