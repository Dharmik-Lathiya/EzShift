  const mongoose = require("mongoose");

  const WorkerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  mobileNo: { type: String, required: true },
  emailId: { type: String },
  password: { type: String, required: true },
  fcmToken: { type: String,default: null },
  address: { type: String },
  earning: { type: Number, default: 0 },
  city:{ type: String },
  avatar: { type: String },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }]
}, { timestamps: true });

module.exports = mongoose.model("Worker", WorkerSchema);
