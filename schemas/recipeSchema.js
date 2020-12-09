const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
    owner: String,
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    fromTheKitchenOf: String,
    description: String,
    serves: Number,
    prepTime: String,
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