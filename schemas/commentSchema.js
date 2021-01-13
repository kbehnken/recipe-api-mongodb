const mongoose = require('mongoose');
const User = require('./userSchema');

const Comment = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner ID is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required']
    },
},{timestamps: true});

module.exports = Comment;