const request = require('supertest');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const URL = require('../models/urlModel');
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
    await URL.deleteMany({});
});

describe('Shorten URL Process', () => {
    test(
        'POST /api/shorten should shorten a long URL',
        async () => {
            const response = await request(app)
                .post('/api/shorten')
                .send({
                    longUrl: 'https://roadmap.sh/backend/project-ideas'
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('shortUrl');
        }
    );

    test(
        'POST /api/shorten should return 400 if URL is missing',
        async () => {
            const response = await request(app)
                .post('/api/shorten')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Missing Url.');
        }
    );

    test(
        'POST /api/shorten should return 500 if createShortUrl throws an error',
        async () => {
            jest.spyOn(
                require('../services/urlService'),
                'createShortUrl'
            ).mockImplementation(() => {
                throw new Error('Test error');
            });

            const response = await request(app)
                .post('/api/shorten')
                .send({
                    longUrl: 'https://roadmap.sh/backend/project-ideas'
                });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Failed to shorten URL');
        }
    );
});

describe('Redirect URL Process', () => {
    test(
        'GET /:shortUrl should return 400 if shortUrl is missing', 
        async () => {
            const response = await request(app)
                .get('/');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'URL missing.');
        }
    );

    test(
        'GET /:shortUrl should return 404 if longUrl is not found', 
        async () => {
            jest.spyOn(
                require('../services/urlService'), 
                'getLongUrl'
            ).mockImplementation(() => null);

        const response = await request(app)
            .get('/nonexistentShortUrl');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Long URL not found.');
        }
    );

    test(
        'GET /:shortUrl should redirect to longUrl if shortUrl is valid', 
        async () => {
            const longUrl = 'https://example.com';
            jest.spyOn(
                require('../services/urlService'), 
                'getLongUrl'
            ).mockImplementation(() => longUrl);

            const response = await request(app)
                .get('/validShortUrl');

        expect(response.status).toBe(200);
        expect(response.header.location).toBe(longUrl);
        }
    );

    test(
        'GET /:shortUrl should return 500 if getLongUrl throws an error', 
        async () => {
            jest.spyOn(
                require('../services/urlService'), 
                'getLongUrl'
            ).mockImplementation(() => {
                throw new Error('Test error');
            });

            const response = await request(app).get('/validShortUrl');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Failed to redirect URL');
        }
    );
});