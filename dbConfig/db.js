const mongoose = require('mongoose');
const { MONGODB_SERVER, MONGODB_PORT } = process.env;
const MONGODB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect('mongodb://' + MONGODB_SERVER + ':' + MONGODB_PORT + '/recipeBox', MONGODB_OPTIONS)
.then(() => {
    console.log('DB Connected');
})
.catch(err => {
    console.log(err);
})
console.log(mongoose)
mongoose.set('returnOriginal', false);

module.exports = mongoose;