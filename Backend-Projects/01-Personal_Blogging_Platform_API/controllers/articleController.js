const Article = require('../models/Articles');

// get all articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get an article by ID
const getArticleById = async (req, res) => {
    const article = await Article.findByPk(req.params.id)
    if (article) {
        res.status(200).json(article);
    } else {
        res.status(404).json({ 
            message: `Article not found` 
        });
    }
}

// create a new article
const createArticle = async (req, res) => {
    try {
        const newArticle = await Article.create(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// update an article by ID
const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (article) {
            await article.update(req.body);
            res.status(200).json(article);
        } else {
            res.status(404).json({ 
                message: `Article not found` 
            });
        }
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(error => error.message);
            res.status(400).json({ errors });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

// delete an article by ID
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (article) {
            await article.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({
                message: `Article not found`
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
}