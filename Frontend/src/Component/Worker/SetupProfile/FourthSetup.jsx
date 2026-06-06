import React from 'react';
import { useNavigate } from 'react-router';
import useVehicleStore from '../../../store/useVehicleStore';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function FourthSetup() {
  
  const {
    vehicleOwner,
    setVehicleOwner,
    vehicleName,
    setVehicleName,
    vehicleCompany,
    setVehicleCompany,
    vehicleModel,
    setVehicleModel,
    vehicleNumber,
    setVehicleNumber,
    drivingLicenseNumber,
    setDrivingLicenseNumber,
    drivingLicense,
    setDrivingLicense,
    vehicleDocument,
    setVehicleDocument,
    vehicleType
  } = useVehicleStore();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Validate inputs
    if (
      !vehicleOwner ||
      !vehicleName ||
      !vehicleNumber ||
      !vehicleCompany ||
      !vehicleModel ||
      !drivingLicenseNumber ||
      !drivingLicense ||
      !vehicleDocument
    ) {
      toast.error('Please fill all fields and upload required documents.');
      return;
    }

    if (!/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/.test(vehicleNumber)) {
      toast.error("Invalid vehicle number format");
      return;
    }

    if(!/^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/.test(drivingLicenseNumber)){
      toast.error("Invalid driving license number format");
      return;
    }

    if(!/^[0-9]{4}$/.test(vehicleModel)){
      toast.error("Invalid vehicle model year format");
      return;
    }

    // File validation: max 5MB, only JPG/PNG
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (drivingLicense.size > MAX_SIZE || vehicleDocument.size > MAX_SIZE) {
      toast.error('File size should not exceed 5MB.');
      return;
    }

    if (!allowedTypes.includes(drivingLicense.type) || !allowedTypes.includes(vehicleDocument.type)) {
      toast.error('Only JPG and PNG images are allowed.');
      return;
    }

    console.log("Vehicle Type:", vehicleType);

    let ownerId = localStorage.getItem("workerId");

    // Prepare form data
    const formData = new FormData();
    formData.append('vehicleOwner', vehicleOwner);
    formData.append('vehicleName', vehicleName);
    formData.append('vehicleCompany', vehicleCompany);
    formData.append('vehicleModel', vehicleModel);
    formData.append("vehicleType", vehicleType);
    formData.append('vehicleNumber', vehicleNumber);
    formData.append('drivingLicenseNumber', drivingLicenseNumber);
    formData.append("drivingLicense", drivingLicense);
    formData.append("vehicleDocument", vehicleDocument);
    formData.append("ownerId", ownerId);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/Worker/Vehicle/Add`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      toast.success('Vehicle details submitted successfully.');
      navigate('/Worker/SetupProfile/Welcome');
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong while submitting vehicle details.';
      toast.error(message);
      console.error(err);
    }
    
    setVehicleOwner("");
    setVehicleName("");
    setVehicleCompany("");
    setVehicleModel("");
    setVehicleNumber("");
    setDrivingLicenseNumber("");
    setDrivingLicense(null);
    setVehicleDocument(null);

  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 w-full max-w-2xl">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Vehicle & Document Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">Provide information about your vehicle and upload required documents.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vehicle Owner */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Owner</label>
            <select
              value={vehicleOwner}
              onChange={(e) => setVehicleOwner(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors bg-white"
            >
              <option value="">Select Owner</option>
              <option value="first">First Owner</option>
              <option value="second">Second Owner</option>
              <option value="third">Third Owner</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Vehicle Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Number Plate</label>
            <input
              type="text"
              placeholder="e.g. GJ01AB1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
            />
          </div>

          {/* Vehicle Company */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Company</label>
            <input
              type="text"
              placeholder="e.g. Tata, Mahindra"
              value={vehicleCompany}
              onChange={(e) => setVehicleCompany(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
            />
          </div>

          {/* Vehicle Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Name</label>
            <input
              type="text"
              placeholder="e.g. Bolero, Ace"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
            />
          </div>

          {/* Vehicle Model Year */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Model Year</label>
            <input
              type="text"
              placeholder="e.g. 2020"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
            />
          </div>

          {/* Driving License Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">License Number</label>
            <input
              type="text"
              placeholder="e.g. GJ05202100012345"
              value={drivingLicenseNumber}
              onChange={(e) => setDrivingLicenseNumber(e.target.value.toUpperCase())}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Driving License File */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Driving License Photo</label>
            <div className="border border-gray-300 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setDrivingLicense(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
            {drivingLicense && (
              <p className="text-xs mt-2 text-gray-600 flex items-center gap-1">
                <i className="fa-solid fa-check text-green-500"></i> {drivingLicense.name}
              </p>
            )}
          </div>

          {/* Vehicle Document */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle RC Book</label>
            <div className="border border-gray-300 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setVehicleDocument(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
            {vehicleDocument && (
              <p className="text-xs mt-2 text-gray-600 flex items-center gap-1">
                <i className="fa-solid fa-check text-green-500"></i> {vehicleDocument.name}
              </p>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white font-semibold py-2.5 px-8 rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
