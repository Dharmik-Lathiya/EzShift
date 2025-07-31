const mongoose = require("mongoose");

const TripSchema = mongoose.Schema({
    clientId: { type: String, required: true },
    fullName: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    pickupAddress: { type: String, required: true },
    dropAddress: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    vehicleType: { type: String, required: true },
    needWorkers: { type: Boolean, default: false },
    numWorkers: { type: Number, default: 0 },
    note: { type: String },
    distance: { type: Number, required: true },
    pricing: { type: Number, required: true },
    isAccept: { type: Boolean, default: false },

});

module.exports = mongoose.model("trip", TripSchema);