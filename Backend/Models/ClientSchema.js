const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  fullName: String,
  mobileNo: String,
  gender:String,
  dob:String,
  emailId: { type: String, unique: true },
  password: String,
  joinAt:String,
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);