module.exports = app => {
    const users = require('../controllers/userController.js');

    // Create a new user profile
    app.post('/api/v1/users', users.create);

    // Return all user profiles
    // app.get('/api/v1/users', users.findAll);

    // Return a single user profile with userId
    // app.get('/api/v1/users/:userId', users.findOne);

    // Update a user profile with userId
    // app.put('/api/v1/users/:userId', users.update);

    // Delete a user profile with userId
    // app.delete('/api/v1/users/:userId', users.delete);

    // Update a user password with userId
    app.put('/api/v1/change-password', users.updatePassword);

};