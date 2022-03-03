const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    departmentName: {type: String, required: true},
    departmentHead: {type: String, required: false},
    departmentDoctors: {type: Array, required: false},
    departmentFacilities: {type: Array, required: false},
});

const DepartmentSchema = mongoose.model("DepartmentSchema", departmentSchema);

module.exports = DepartmentSchema;
