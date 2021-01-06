const mongoose = require("mongoose");

const localSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String
});

const Local = mongoose.model("Local", localSchema);

module.exports = Local;