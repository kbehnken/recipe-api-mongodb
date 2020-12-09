const mongoose = require('../dbConfig/db');
const bcrypt = require('bcrypt');
const signToken = require('../helpers/signToken.js');
const userSchema = require('../schemas/userSchema');
const userModel = mongoose.model('User', userSchema);

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    
    userModel.findOne({
        email: email
    })
    .then(result => {
        if (email === result.email && bcrypt.compareSync(password, result.password)) {
            // Generate json web token
            const accessToken = signToken(result);
            res.status(200).send({
                accessToken
            });
        } else {
            res.status(401).send({err: 'Login failed.'});
        }
    })
    .catch (err => {
        res.status(500).send({err: err});
    })
}