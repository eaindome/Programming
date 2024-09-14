const { DataTypes } = require('sequelize');
const { sequelize }= require('../config/database');
const bcrypt = require('bcryptjs');
const Task = require('./Tasks');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'User',
});

User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// define relationships between users and tasks
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;