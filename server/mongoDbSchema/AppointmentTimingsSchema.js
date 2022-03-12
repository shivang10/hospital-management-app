const mongoose = require("mongoose");

const appointmentTimingsSchema = new mongoose.Schema({
    doctorId: {type: String, required: true},
    doctorName: {type: String, required: true},
    appointmentTimings: {type: Object, required: true},
});


const AppointmentTimingsSchema = mongoose.model("appointmentTimingsSchema", appointmentTimingsSchema);

module.exports = AppointmentTimingsSchema;
