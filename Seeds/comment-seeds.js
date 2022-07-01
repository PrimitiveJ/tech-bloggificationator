const { Comment } = require('../models');

const commentData = [
    {
        id: 1,
        commentary: "A",
        user_id: 1,
        post_id: 5,
    },

    {
        id: 2,
        commentary: "B",
        user_id: 2,
        post_id: 1,
    },

    {
        id: 3,
        commentary: "C",
        user_id: 3,
        post_id: 2,
    },

    {
        id: 4,
        commentary: "D",
        user_id: 4,
        post_id: 3,
    },

    {
        id: 5,
        commentary: "E",
        user_id: 5,
        post_id: 1,
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;