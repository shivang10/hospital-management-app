const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    age: {type: Number, required: false},
    address: {type: String, required: false},
    phoneNumber: {type: Number, required: false},
    careTakerName: {type: String, required: false},
    careTakerNumber: {type: Number, required: false},
    gender: {type: String, required: false},
    weight: {type: Number, required: false},
    identityProof: {
        data: Buffer,
        contentType: String,
        required: false,
    },
});

const UserSchema = mongoose.model("UserSchema", userSchema);

module.exports = UserSchema;
