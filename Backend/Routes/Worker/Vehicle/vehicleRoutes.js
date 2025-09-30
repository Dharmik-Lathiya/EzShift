const log = require('node-dev/lib/log');
const Vehicle = require('../../../Models/VechialSchema');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


exports.createVehicle = async (req, res) => {
  try {
    const {
      vehicleOwner,
      vehicleName,
      vehicleCompany,
      vehicleModel,
      vehicleNumber,
      ownerId,
      vehicleType
    } = req.body;
    
    // Use mutable variables for optional fields
    let { drivingLicenseNumber, drivingLicense } = req.body;

    console.log(req.body);
    

    if (!drivingLicenseNumber) drivingLicenseNumber = "";
    if (!drivingLicense) drivingLicense = "";


    // Basic required validations
    if (!vehicleOwner || !vehicleName || !vehicleCompany || !vehicleModel || !vehicleNumber || !ownerId || !vehicleType) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Format validations
    const vehicleNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    if (!vehicleNumberRegex.test((vehicleNumber || '').toString().toUpperCase())) {
      return res.status(400).json({ success: false, message: 'Invalid vehicle number format.' });
    }


    const modelYearRegex = /^[0-9]{4}$/;
    if (!modelYearRegex.test((vehicleModel || '').toString())) {
      return res.status(400).json({ success: false, message: 'Invalid vehicle model year format.' });
    }

    // Check duplicate number
    const exists = await Vehicle.findOne({ vehicleNumber: vehicleNumber.trim().toUpperCase() });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Vehicle number already exists.' });
    }

    // Cloudinary config (only if we need to upload files)
    if (process.env.CLOUD_NAME && process.env.CLOUD_API_KEY && process.env.CLOUD_API_SECRET) {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });
    }

    // Handle file uploads if files are provided via multer.fields
    let drivingLicenseUrl = req.body.drivingLicense || '';
    let vehicleDocumentUrl = req.body.vehicleDocument || '';

    const hasFiles = req.files && (req.files.drivingLicense?.length || req.files.vehicleDocument?.length);
    if (hasFiles) {
      try {
        if (req.files.drivingLicense?.[0]?.path) {
          const up = await cloudinary.uploader.upload(req.files.drivingLicense[0].path, { resource_type: 'auto' });
          drivingLicenseUrl = up.secure_url;
          fs.unlinkSync(req.files.drivingLicense[0].path);
        }
        if (req.files.vehicleDocument?.[0]?.path) {
          const up2 = await cloudinary.uploader.upload(req.files.vehicleDocument[0].path, { resource_type: 'auto' });
          vehicleDocumentUrl = up2.secure_url;
          fs.unlinkSync(req.files.vehicleDocument[0].path);
        }
      } catch (e) {
        return res.status(500).json({ success: false, message: 'Failed to upload documents', error: e.message });
      }
    }

    const vehicle = new Vehicle({
      vehicleOwner,
      vehicleName,
      vehicleCompany,
      vehicleModel,
      vehicleType,
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      drivingLicenseNumber: (drivingLicenseNumber || "").toString().trim().toUpperCase(),
      drivingLicense: drivingLicenseUrl,
      vehicleDocument: vehicleDocumentUrl,
      ownerId,
    });

    await vehicle.save();
    res.status(201).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating vehicle', error: error?.message || error });
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

exports.getActiveVehicles = async (req, res) => {
  try {
    const vehicle = req.query.vehicleType; 
    const vehicles = await Vehicle.find({
      ownerId: req.params.id,
      vehicleType: vehicle,
      status: "Active",
    });

    if (vehicles.length === 0) {
      return res.status(404).json({ success: false, message: 'No active vehicles found' });
    }

    res.json({ success: true, vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching active vehicles', error });
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