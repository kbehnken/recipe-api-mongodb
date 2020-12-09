const mongoose = require('../dbConfig/db');
const recipeSchema = require('../schemas/recipeSchema');
const recipeModel = mongoose.model('Recipe', recipeSchema);

exports.create = async (req, res, next) => {
    const recipe = new recipeModel(req.body);

    return recipe.save()
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        console.log(err);
    })
}

exports.findAll = async (req, res, next) => {
    return recipeModel.find()
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        console.log(err);
    })
}

exports.findByRecipeId = async (req, res, next) => {
    const recipeId = req.params.recipeId;

    return recipeModel.findById(recipeId)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        console.log(err);
    })
}

exports.findMyRecipes = async (req, res, next) => {
    const userId = req.user._id;
    
    return recipeModel.find({
        owner: userId
    })
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        console.log(err);
    })
}