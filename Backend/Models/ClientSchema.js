const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  fullName: String,
  mobileNo: String,
  gender:String,
  dob:String,
  emailId: { type: String, unique: true },
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  profilePic: { type: String, default: "" },
  bio: { type: String, default: "" },
  joinAt:String,
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);