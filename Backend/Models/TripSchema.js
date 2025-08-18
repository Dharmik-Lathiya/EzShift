const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  pickupAddress: { type: String, required: true },
  dropAddress: { type: String, required: true },
  date: { type: Date, required: true },
  vehicleType: {
    type: String,
    enum: ['miniTruck','smallVan','pickupTruck','mediumDutyTruck','containerTruck','openBodyTruck'],
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: false
  },
  vehicleAssigned: {
    type: Boolean,
    default: false
  },
  pricing:{
    type : Object,
  },
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'InProgress', 'Completed', 'Paid'],
    default: 'Pending'
  },
  numWorkers: {
    type: Number,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  workers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" }],
  acceptedAt: {
    type: Date
  },
  note: {
    type: String
  },
  timeSlot: {
    type: String
  },
}, { timestamps: true });


module.exports = mongoose.model("Trip", TripSchema);
