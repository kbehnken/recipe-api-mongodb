module.exports = app => {
    const auth = require('../controllers/authController.js');

    app.post('/api/v1/login', auth.login);
};