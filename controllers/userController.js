const bcrypt = require('bcrypt');
const mongoose = require('../dbConfig/db');
const userSchema = require('../schemas/userSchema');
const userModel = mongoose.model('User', userSchema);

exports.create = async (req, res, next) => {
    const user = new userModel(req.body);

    user.password = bcrypt.hashSync(user.password, 10);
    return user.save()
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(500).send(err);
    })
};

// Update a user password for the userId specified in the request
exports.updatePassword = async (req, res, next) => {
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    const oldPassword = req.body.oldPassword;
    const userId = req.user._id;
    
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
    }
    if (req.body.newPassword.length < 12) {
        return res.status(400).send({
            message: 'Password does not meet minimum length requirement!'
        });
    }
    const user = await userModel.findById(userId);
    
    if (!bcrypt.compareSync(oldPassword, user.password)) {
        return res.status(401).send('Password comparison failed.');
    }
    user.password = newPassword;
    return user.save()
    .then(() => {
        res.status(200).send('Password updated!');
    });
};