const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    age: Number,
});

const UserSchema = mongoose.model("UserSchema", userSchema);

module.exports = UserSchema;
