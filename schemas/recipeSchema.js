const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Owner ID is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    fromTheKitchenOf: String,
    description: {
        type: String,
        maxlength: 4500
    },
    serves: Number,
    prepTime: {
        type: String,
        required: [true, 'Prep Time is required']
    },
    cookTime: String,
    directions: String,
    ingredients: [
        {
            name: String,
            quantity: String
        }
    ],
    isShared: {
        type: Boolean,
        required: [true, 'Is Shared is required']
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{timestamps: true});

Recipe.index({
    name: 'text'
})

module.exports = Recipe;