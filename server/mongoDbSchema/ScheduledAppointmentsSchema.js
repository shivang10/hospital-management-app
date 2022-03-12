const mongoose = require("mongoose");

const scheduledAppointmentsSchema = new mongoose.Schema({
    doctorId: {type: String, required: true},
    doctorName: {type: String, required: true},
    patientId: {type: String, required: true},
    patientName: {type: String, required: true},
    day: {type: String, required: true},
    time: {type: String, required: true},
    problem: {type: String, required: true},
});


const ScheduledAppointmentsSchema = mongoose.model("scheduledAppointmentsSchema", scheduledAppointmentsSchema);

module.exports = ScheduledAppointmentsSchema;
