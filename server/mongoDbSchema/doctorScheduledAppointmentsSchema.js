const mongoose = require("mongoose");

const doctorScheduledAppointmentsSchema = new mongoose.Schema({
    patientId: {type: String, required: true},
    charges: {type: Number, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
});

const DoctorAppointmentsViewSchema = mongoose.model("DoctorAppointmentsViewSchema", doctorScheduledAppointmentsSchema);

module.exports = DoctorAppointmentsViewSchema;
