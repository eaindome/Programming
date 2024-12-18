import request from 'supertest';
import app from '../src/app'; // Adjust the path to your app file
import prisma from '../src/config/db';

const api = request(app);

describe('Recipe Endpoints', () => {
    let token: string;
    let recipeId: number;
    let userId: number;

    beforeAll(async () => {
        // Clean up the database before running tests
        await prisma.recipe.deleteMany();
        await prisma.user.deleteMany();

        // Create a test user and get a token
        const userResponse = await api.post('/api/auth/signup').send({
            email: 'testuser@example.com',
            password: 'TestPassword123!',
        });
        token = userResponse.body.token;
        userId = userResponse.body.user.id;

        // create a test recipe
        const recipeResponse = await api
            .post('/api/recipes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Recipe',
                description: 'Test Description',
                ingredients: 'Test Ingredients',
                instructions: 'Test Instructions',
                labels: 'test',
            });
        recipeId = recipeResponse.body.id;
    });

    afterAll(async () => {
        // Disconnect Prisma after tests
        await prisma.$disconnect();
    });

    describe('POST /api/recipes', () => {
        it('should create a new recipe and return 201 status', async () => {
            const response = await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Recipe',
                    description: 'Test Description',
                    ingredients: 'Test Ingredients',
                    instructions: 'Test Instructions',
                    labels: 'test',
                });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            recipeId = response.body.id;
        });

        it('should return 400 if title is missing', async () => {
            const response = await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: 'Test Description',
                    ingredients: 'Test Ingredients',
                    instructions: 'Test Instructions',
                    labels: 'test',
                });
            // console.log(`response: ${JSON.stringify(response)}`);
            expect(response.status).toBe(400);
        });

        it('should return 400 if description is missing', async () => {
            const response = await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Recipe',
                    ingredients: 'Test Ingredients',
                    instructions: 'Test Instructions',
                    labels: 'test',
                });
            expect(response.status).toBe(400);
        });

        it('should return 400 if ingredients are missing', async () => {
            const response = await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Recipe',
                    description: 'Test Description',
                    instructions: 'Test Instructions',
                    labels: 'test',
                });
            expect(response.status).toBe(400);
        });

        it('should return 400 if instructions are missing', async () => {
            const response = await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Recipe',
                    description: 'Test Description',
                    ingredients: 'Test Ingredients',
                    labels: 'test',
                });
            expect(response.status).toBe(400);
        });

        it('should return 500 if image processing fails', async () => {
            const response = await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${token}`)
                .attach('image', Buffer.from('invalid image'), 'test.png')
                .field('title', 'Test Recipe')
                .field('description', 'Test Description')
                .field('ingredients', 'Test Ingredients')
                .field('instructions', 'Test Instructions')
                .field('labels', 'test');
            expect(response.status).toBe(500);
        });

        it('should return 401 if unauthorized', async () => {
            const response = await api
                .post('/api/recipes')
                .send({
                    title: 'Test Recipe',
                    description: 'Test Description',
                    ingredients: 'Test Ingredients',
                    instructions: 'Test Instructions',
                    labels: 'test',
                });
            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/recipes', () => {
        it('should list recipes and return 200 status', async () => {
            const response = await api.get('/api/recipes');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should list recipes with search filter and return 200 status', async () => {
            const response = await api.get('/api/recipes').query({ search: 'Test' });
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should list recipes with chef filter and return 200 status', async () => {
            const response = await api.get('/api/recipes').query({ chef: userId });
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should list recipes with label filter and return 200 status', async () => {
            const response = await api.get('/api/recipes').query({ label: 'test' });
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should list recipes with pagination and return 200 status', async () => {
            const response = await api.get('/api/recipes').query({ page: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should handle errors gracefully and return 500 status', async () => {
            // Simulate an error by mocking the prisma.recipe.findMany method
            jest.spyOn(prisma.recipe, 'findMany').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const response = await api.get('/api/recipes');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Error listing recipes');
        });
    });

    describe('GET /api/recipes/:id', () => {
        it('should get a recipe by ID and return 200 status', async () => {
            const response = await api.get(`/api/recipes/${recipeId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', recipeId);
        });

        it('should return 404 if recipe not found', async () => {
            const response = await api.get('/api/recipes/99999');
            expect(response.status).toBe(404);
        });

        it('should return 400 for invalid ID format', async () => {
            const response = await api.get('/api/recipes/invalid-id');
            // console.log(`response: ${JSON.stringify(response)}`);   
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid recipe ID format');
        });
    
        it('should return 500 if there is a database error', async () => {
            jest.spyOn(prisma.recipe, 'findUnique').mockImplementationOnce(() => {
                throw new Error('Database error');
            });
    
            const response = await api.get('/api/recipes/1');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Error getting recipe');
        });
    });

    describe('PUT /api/recipes/:id', () => {
        it('should update a recipe and return 200 status', async () => {
            const response = await api
                .put(`/api/recipes/${recipeId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Updated Test Recipe',
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Updated Test Recipe');
        });
        
        it('should return 403 if unauthorized', async () => {
            const response = await api
                .put(`/api/recipes/${recipeId}`)
                .send({
                    title: 'Updated Test Recipe',
                });
            // console.log(`response: ${JSON.stringify(response.body)}`);
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Unauthorized');
        });

        it('should return 404 if recipe not found', async () => {
            const response = await api
                .put('/api/recipes/99999')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Updated Test Recipe',
                });
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'Recipe not found');
        });
    
        it('should return 400 for invalid ID format', async () => {
            const response = await api
                .put('/api/recipes/invalid-id')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Updated Test Recipe',
                });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid recipe ID format');
        });
    
        it('should return 500 if there is a database error', async () => {
            jest.spyOn(prisma.recipe, 'findUnique').mockImplementationOnce(() => {
                throw new Error('Database error');
            });
    
            const response = await api
                .put(`/api/recipes/${recipeId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Updated Test Recipe',
                });
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Error updating recipe');
        });
    });

    describe('DELETE /api/recipes/:id', () => {
        it('should delete a recipe and return 200 status', async () => {
            const response = await api
                .delete(`/api/recipes/${recipeId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });

        it('should return 404 if recipe not found', async () => {
            const response = await api
                .delete(`/api/recipes/99999`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
        });

        it('should return 403 if unauthorized', async () => {
            const response = await api.delete(`/api/recipes/${recipeId}`);
            // console.log(`response: ${JSON.stringify(response.body)}`);
            expect(response.status).toBe(401);
        });

        it('should return 400 for invalid ID format', async () => {
            const response = await api
                .delete('/api/recipes/invalid-id')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid recipe ID format');
        });
    
        it('should return 500 if there is a database error', async () => {
            jest.spyOn(prisma.recipe, 'findUnique').mockImplementationOnce(() => {
                throw new Error('Database error');
            });
    
            const response = await api
                .delete(`/api/recipes/${recipeId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Error deleting recipe');
        });
    });
});