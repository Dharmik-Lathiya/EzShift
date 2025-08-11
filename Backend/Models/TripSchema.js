const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
    required: false 
  },
  vehicleAssigned: {
    type: Boolean,
    default: false
  },
  fare: { type: Number },
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'InProgress', 'Completed', 'Paid'],
    default: 'Pending'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients',
    required: true
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workers'
  },
  acceptedAt: {
    type: Date
  }
}, { timestamps: true });


module.exports = mongoose.model("Trip", TripSchema);
