const mongoose = require("mongoose");

const facilitiesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    checkupPrice: {type: Number, required: true},
});

const FacilitiesSchema = mongoose.model("FacilitiesSchema", facilitiesSchema);

module.exports = FacilitiesSchema;
