//Import sequelize library/package
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Defines 'Post' as a model
class Post extends Model {}

//Creates a new model for a Post
Post.init({
    //Column definitions for the model(ID, TITLE, CONTENTS, USER_ID, dateCreated)
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
    },

    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id' 
        }
    }, 

    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
    },  
},

{
    //Sequelize Options for this model
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
}
);

//Export this model as 'Post'
module.exports = Post;