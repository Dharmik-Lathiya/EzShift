const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true },
  vehicleCompany:{ type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { 
  type: String, 
  required: true, 
  unique: true, 
  trim: true, 
  uppercase: true 
},

  vehicleModel: { type: String, required: true  },
  drivingLicenseNumber:{type: String, required: true},
  drivingLicense:{ type: String, required: false, default: "" },
  assignedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Inactive"
  },
  
  vehicleOwner:{
     type: Object, required: false,default: ""
  },
  vehicleDocument:{
     type: Object, required: false,default: ""
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    required: false,
    default: null
  },
  earnings: {
    type: Number,
    default: 0
  }
}, {
  collection: "vehicles",
  timestamps: true
});



module.exports = mongoose.model("Vehicle", VehicleSchema);
