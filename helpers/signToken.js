require('dotenv').config();

const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const maxTokenLifetime = '72h';
const signToken = function (data) {
    return jwt.sign(
        {
            email: data.email,
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            isAdmin: data.isAdmin
        },
        accessTokenSecret,
        {
            expiresIn: maxTokenLifetime
        }
    );
}

module.exports = signToken;