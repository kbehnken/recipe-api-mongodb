const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
    ownerId: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    fromTheKitchenOf: String,
    description: String,
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
    ]
},{timestamps: true});

module.exports = Recipe;