const { Sequelize } = require('sequelize');

const database = process.env.NOD_ENV === 'test' ? 'todolist_test' : 'todolist';

// initialize the sequelize instance
const sequelize = new Sequelize(
    database,
    'eaindome',
    'eai810675',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: console.log,
    }
);

// establish connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established with the database');

        await sequelize.sync({
            force: false,
        });
        console.log('Database synchronised...')
    } catch (err) {
        console.error(`Unable to connect to the database: ${err}`);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };