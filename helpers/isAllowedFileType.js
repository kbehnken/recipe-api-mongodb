const fileType = require('file-type');
const isAllowedFileType = async function (buff) {
    const allowedFileTypes = ['jpg', 'jpeg', 'gif', 'png'];
    type = await fileType.fromBuffer(buff)
    return allowedFileTypes.includes(type.ext)
};

module.exports = isAllowedFileType;