  const mongoose = require("mongoose");

  const WorkerSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    mobileNo: { type: String, required: true },
    emailId: { type: String },
    password: { type: String, required: true },
    address: { type: String },
    city:{ type: String},
    trips: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip"
    }],
    avatar:{ type: String, required: false },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  }, { timestamps: true });

  module.exports = mongoose.model("Worker", WorkerSchema);
