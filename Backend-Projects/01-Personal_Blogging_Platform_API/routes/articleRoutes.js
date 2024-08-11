const articleController = require('../controllers/articleController');

async function articleRoutes(fastify, options) {
    fastify.post('/articles', articleController.createArticle);
    fastify.get('/articles', articleController.getAllArticles);
    fastify.get('/articles/:id', articleController.getArticleById);
    fastify.put('/articles/:id', articleController.updateArticle);
    fastify.delete('/articles/:id', articleController.deleteArticle);
}

module.exports = articleRoutes;