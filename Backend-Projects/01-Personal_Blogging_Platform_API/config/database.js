const { Sequelize } = require('sequelize');
const Article = require('../models/Articles');

const database = process.env.NODE_ENV === 'test' ? 'blogging_platform_test' : 'blogging_platform';

// initialize the sequelize instance
const sequelize = new Sequelize(
    database, 
    'blog_user', 
    'eaindome',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: console.log,
    }
);

// connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established with the database');

        await sequelize.sync({
            force: false,
        });
        console.log('Database synchronised...');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB};