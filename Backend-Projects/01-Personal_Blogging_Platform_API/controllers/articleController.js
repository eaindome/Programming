const Article = require('../models/Articles');

// get all articles
const getAllArticles = async (req, reply) => {
    try {
        const articles = await Article.findAll();
        reply.code(200).send(articles);
    } catch (error) {
        reply.code(500).send({ message: error.message });
    }
}

// get an article by ID
const getArticleById = async (req, reply) => {
    const article = await Article.findByPk(req.params.id)
    if (article) {
        reply.code(200).send(article);
    } else {
        reply.code(404).send({ 
            message: `Article not found` 
        });
    }
}

// create a new article
const createArticle = async (req, reply) => {
    try {
        const newArticle = await Article.create(req.body);
        reply.code(201).send(newArticle);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            reply.code(400).send({ errors });
        } else {
            reply.code(500).send({ message: error.message });
        }
    }
}

// update an article by ID
const updateArticle = async (req, reply) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (article) {
            await article.update(req.body);
            reply.code(200).send(article);
        } else {
            reply.code(404).send({ 
                message: `Article not found` 
            });
        }
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(error => error.message);
            reply.code(400).send({ errors });
        } else {
            reply.code(500).send({ message: err.message });
        }
    }
}

// delete an article by ID
const deleteArticle = async (req, reply) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (article) {
            await article.destroy();
            reply.code(204).send();
        } else {
            reply.code(404).send({
                message: `Article not found`
            });
        }
    } catch (error) {
        reply.code(500).send({ message: error.message });
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
}