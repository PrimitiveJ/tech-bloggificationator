//Import sequelize library/package
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define User as a model
// class User extends Model {
    // Define Method to run on each user created to check the password
    // checkPassword(loginPw) {
    //     return bcrypt.compareSync(loginPw, this.password);
    // }
// }

//Initialize User Model
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }, 

    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5],
        },
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5],
        },
    }
},
{
    // hooks: {
    //     async beforeCreate(newUserData) {
    //         newUserData.password = await bcrypt.hash(
    //             newUserData.password, 
    //             10
    //         );
    //         return newUserData;
    //     },

    //     async beforeUpdate(updatedUserData) {
    //         updatedUserData.password = await bcrypt.hash(
    //             updatedUserData.password, 
    //             10
    //         );
    //         return updatedUserData;
    // },
// },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
}
);

User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;