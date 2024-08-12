const request = require('supertest');
const fastify = require('fastify');
const articleRoutes = require('../routes/articleRoutes');
const { sequelize } = require('../config/database');

// create a fastify instance for testing
let app;

beforeAll(async () => {
    app = fastify();
    try {
        await sequelize.sync({ force: true });
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    try {
        app.register(articleRoutes);
    } catch (err) {
        console.error('Error registering the routes:', err);
        process.exit(1);
    }
    await app.ready();
});

afterAll(async () => {
    await sequelize.close();
    await app.close();
});

describe('Article Routes', () => {
    test(
        'GET /articles should return an empty array initially',
        async () => {
            const response = await request(app.server).get('/articles');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        }
    );

    test(
        'POST /articles should create a new article',
        async () => {
            const newArticle = {
                title: 'Test Article',
                content: 'This is a test article.',
                published: true,
            };
            const response = await request(app.server).post('/articles').send(newArticle);
            expect(response.status).toBe(201);
            expect(response.body.title).toBe('Test Article');
            expect(response.body.content).toBe('This is a test article.');
        }
    );

    test(
        'GET /articles/:id should return the created article',
        async () => {
            const response = await request(app.server).get('/articles/1');
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                id: 1,
                title: 'Test Article',
                content: 'This is a test article.',
                published: true,
            });
        }
    );

    test(
        'PUT /articles/:id should update the article',
        async () => {
            const updatedArticle = {
                title: 'Updated Test Article',
                content: 'This is an updated test article.',
            };
            const response = await request(app.server).put('/articles/1').send(updatedArticle);
            expect(response.status).toBe(200);
            expect(response.body.title).toBe('Updated Test Article');
            expect(response.body.content).toBe('This is an updated test article.');
        }
    );

    test(
        'DELETE /articles/:id should delete the article',
        async () => {
            const response = await request(app.server).delete('/articles/1');
            expect(response.status).toBe(204);
        }
    );

    test(
        'GET /articles/:id should return 404 after deletion',
        async () => {
            const response = await request(app.server).get('/articles/1');
            expect(response.status).toBe(404);
        }
    );
});