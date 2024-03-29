const recipes = require('../controllers/recipeController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

module.exports = app => {
    // Create a new recipe
    app.post('/api/v1/recipes', upload.single('photo'), recipes.createRecipe);

    // Return all recipes
    app.get('/api/v1/recipes', recipes.findAll);

    // Return a single Recipe with recipeId
    app.get('/api/v1/recipes/by-recipe-id/:recipeId', recipes.findByRecipeId);

    // Return all recipes owned by user
    app.get('/api/v1/recipes/by-owner-id/:ownerId', recipes.findByOwnerId);

    // Update a recipe with recipeId
    app.put('/api/v1/recipes/:recipeId', upload.single('photo'), recipes.updateRecipe);

    // // Delete a recipe with recipeId
    // app.delete('/api/v1/recipes/:recipeId', recipes.delete);

    // Add a new favorite recipe
    app.post('/api/v1/recipes/favorites', recipes.addFavoriteRecipe);

    // Return all favorite recipes with userId
    app.get('/api/v1/recipes/favorites/:userId', recipes.findFavoriteRecipesByUserId);
 
    // Delete a favorite recipe with recipeId
    app.delete('/api/v1/recipes/favorites', recipes.deleteFavoriteRecipe);

    // Return recently added recipes
    app.get('/api/v1/recipes/recent/:number', recipes.findRecentRecipes);

    // Add a new comment
    app.post('/api/v1/recipes/comments', recipes.addComment);

    // Return an image with recipeId
    app.get('/api/v1/recipes/photos/:recipeId', recipes.findPhoto);

    // Return search results
    app.post('/api/v1/search-recipes', recipes.findSearchResults);
};