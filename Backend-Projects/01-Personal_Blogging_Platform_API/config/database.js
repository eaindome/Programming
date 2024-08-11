const { Sequelize } = require('sequelize');

// initialize the sequelize instance
const sequelize = new Sequelize(
    'blogging_platform', 
    'blog_user', 
    'eaindome',
    {
        host: 'localhost',
        dialect:'postgres',
    }
);

// connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established with the database');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
}

module.exports = {
    sequelize,
    connectDB,
}