const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  mobileNo: String,
  walletBalance: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Admin", AdminSchema);