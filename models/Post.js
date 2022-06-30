const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }, 

    title: {
        type: DataTypes.STRING,
        allowNull: false,  
    },

    contents: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})