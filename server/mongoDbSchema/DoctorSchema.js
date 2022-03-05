const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: false},
    address: {type: String, required: false},
    phoneNumber: {type: Number, required: false},
    gender: {type: String, required: false},
    speciality: {type: String, required: false},
    department: {type: String, required: false},
    appointmentTimings: {type: Array, required: false},
    scheduledAppointments: {type: Array, required: false},
});

const DoctorSchema = mongoose.model("DoctorSchema", doctorSchema);

module.exports = DoctorSchema;
