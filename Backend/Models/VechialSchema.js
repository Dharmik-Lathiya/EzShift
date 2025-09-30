  const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true },
  vehicleCompany:{ type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true, unique: true, trim: true, uppercase: true },
  vehicleModel: { type: String, required: true },
  drivingLicenseNumber:{ type: String, required: false, default: "" },
  drivingLicense:{ type: String, default: "" },
  assignedDate: { type: Date, default: Date.now },

  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },

  vehicleOwner: { type: Object, default: "" },
  vehicleDocument: { type: Object, default: "" },

  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
  earnings: { type: Number, default: 0 }
}, { collection: "vehicles", timestamps: true });

module.exports = mongoose.model("Vehicle", VehicleSchema);
