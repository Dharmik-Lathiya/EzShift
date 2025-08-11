const log = require('node-dev/lib/log');
const Vehicle = require('../../../Models/VechialSchema');


exports.createVehicle = async (req, res) => {
  try {
    if (!req.body.vehicleNumber || req.body.vehicleNumber.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Vehicle number is required."
      });
    }

    const exists = await Vehicle.findOne({
      vehicleNumber: req.body.vehicleNumber.trim()
    });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Vehicle number already exists."
      });
    }

    const vehicle = new Vehicle({
      ...req.body,
      vehicleNumber: req.body.vehicleNumber.trim()
    });

    await vehicle.save();
    res.status(201).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating vehicle', error });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    console.log("Param",req.params.id);
  const vehicles = await Vehicle.find({ ownerId:req.params.id })
    res.json({ success: true, vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching vehicles', error });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    res.json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching vehicle', error });
  }
};

exports.updateVehicle = async (req,res) =>{
  try{
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Updating vehicle with ID:", req.params.id);
    console.log("Request body:", req.body);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    Object.assign(vehicle, req.body);
    await vehicle.save();
    res.json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating vehicle', error });
  }
}

exports.updateVehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating vehicle', error });
  }
};


exports.deleteVehicle = async (req, res) => {
  try {
    console.log("Deleting vehicle with ID:", req.params.id);
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    res.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting vehicle', error });
  }
};