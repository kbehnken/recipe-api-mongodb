const fs = require('fs');
const path = process.env.PHOTO_PATH;
const handleFileUpload = function(buff, recipeId) {
    const fileName = path + '/recipe-photo-' + recipeId;

    fs.writeFile(fileName, buff, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = handleFileUpload;