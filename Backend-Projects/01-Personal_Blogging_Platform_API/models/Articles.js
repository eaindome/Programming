const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Article = sequelize.define(
    'Article', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }
);

module.exports = Article;