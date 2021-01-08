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

// Add a favorite recipe
exports.addFavoriteRecipe = async (req, res, next) => {
    const { recipeId } = req.body;
    const userId = req.user._id;
    
    return userModel.findById(userId)
    .then(user => {
        user.favoriteRecipes.push(recipeId);
        let seen = {};
        user.favoriteRecipes = user.favoriteRecipes.filter(item => {
            return seen.hasOwnProperty(item.toString())
                ? false
                : (seen[item.toString()] = true)
        })
        user.save()
        .then(() => {
            res.status(200).send('Successfully added recipe to favorites');
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.findFavoriteRecipesByUserId = async (req, res, next) => {
    const { userId } = req.params;

    await userModel.findById(userId)
    .populate('favoriteRecipes')
    .then(result => {
        
        res.status(200).send(result.favoriteRecipes)
    })
    .catch(err => {
        console.log(err);
    })
}

exports.deleteFavoriteRecipe = (req, res, next) => {
    const recipeId = mongoose.Types.ObjectId(req.body.recipeId);
    const userId = req.user._id;

    userModel.findById(userId)
    .then(user => {
        const favoriteRecipe = user.favoriteRecipes.indexOf(recipeId);

        user.favoriteRecipes.splice(favoriteRecipe, 1);
        user.save()
        .then(() => {
            res.status(200).send('Successfully removed recipe from favorites')
        })
    })
}

exports.findRecentRecipes = (req, res, next) => {
    const { number } = req.params;

    return recipeModel.find().sort({createdAt: 'desc'}).limit(parseInt(number))
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        console.log(err);
    })
}