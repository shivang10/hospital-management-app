const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: false},
    address: {type: String, required: true},
    phoneNumber: {type: Number, required: false},
    gender: {type: String, required: true},
    speciality: {type: String, required: true},
    domain: {type: String, required: true},
});

const DoctorSchema = mongoose.model("DoctorSchema", doctorSchema);

module.exports = DoctorSchema;
