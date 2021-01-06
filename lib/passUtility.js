const crypto = require("crypto");
exports.genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10, 64, 'sha512').toString('hex');

    return {
        salt,
        hash
    }
}

exports.validatePassword = (password, salt, hash) => {
    const validHash = crypto.pbkdf2Sync(password, salt, 10, 64, 'sha512').toString('hex');
    return hash === validHash;
}


