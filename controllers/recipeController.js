const mongoose = require('../dbConfig/db');
const recipeSchema = require('../schemas/recipeSchema');
const recipeModel = mongoose.model('Recipe', recipeSchema);
const userSchema = require('../schemas/userSchema');
const userModel = mongoose.model('User', userSchema);

// Create and save a new recipe
exports.createRecipe = async (req, res, next) => {
    const recipe = new recipeModel(req.body);
    recipe.ownerId = req.user._id;

    return recipe.save()
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        console.log(err);
    })
};

// Return all recipes
exports.findAll = async (req, res, next) => {
    return recipeModel.find({})
    .then(async result => {
        for (let i = 0; i < result.length; i++) {
            await userModel.find({
                _id: result[i].ownerId
            })
            .then(user => {
                const ownerName = user[0].firstName + ' ' + user[0].lastName;

                result[i] = {...result[i].toObject(), ownerName: ownerName}
            })
        }
        res.status(200).send(result)
    })
    .catch(err => {
        console.log(err);
    })
};

// Return a single recipe with recipeId
exports.findByRecipeId = async (req, res, next) => {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;

    return recipeModel.findById(recipeId)
    .then(async recipe => {
        await userModel.findById(userId)
        .then(user => {
            let isFavorite = false;

            for (let i = 0; i < user.favoriteRecipes.length; i++) {
                if (user.favoriteRecipes[i].toString() === recipeId) {
                    isFavorite = true;
                }
            }
            recipe = {...recipe.toObject(), isFavorite}
        })
        res.status(200).send(recipe)
    })
    .catch(err => {
        console.log(err);
    })
}

// Return all recipes with ownerId
exports.findByOwnerId = async (req, res, next) => {
    const userId = req.params.ownerId;
    let ownerName = '';

    await userModel.find({
        _id: userId
    })
    .then(user => {
        ownerName = user[0].firstName + ' ' + user[0].lastName;
    });
    return recipeModel.find({
        ownerId: userId
    })
    .then(result => {
        for (let i = 0; i < result.length; i++) {
            result[i] = {...result[i].toObject(), ownerName: ownerName}
        }
        res.status(200).send(result)
    })
    .catch(err => {
        console.log(err);
    })
}

