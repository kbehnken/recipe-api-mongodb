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
}