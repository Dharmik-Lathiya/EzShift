import React, { use } from 'react';
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
      !vehicleCompany ||
      !vehicleModel ||
      !drivingLicenseNumber ||
      !drivingLicense ||
      !vehicleDocument
    ) {
      toast.error('Please fill all fields and upload required documents.');
      return;
    }

    if (!vehicleNumber) {
  toast.error("Vehicle number is required");
  return;
}


    console.log("Done",drivingLicense, vehicleDocument);
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

    console.log('Submitted:', {
      vehicleOwner,
      vehicleName,
      vehicleCompany,
      vehicleModel,
      vehicleNumber,
      drivingLicenseNumber,
      drivingLicense,
      vehicleDocument,
      ownerId,
      vehicleType
    });

    try {
      const res = await axios.post(
        'http://localhost:3000/Worker/Vehicle/Add',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      toast.success('Vehicle details submitted successfully.');
      navigate('/Worker/SetupProfile/Welcome');
    } catch (err) {
      toast.error('Error submitting vehicle details.');
      console.error(err);
    }
    
    setVehicleOwner("");
    setVehicleName("");
    setVehicleCompany("");
    setVehicleModel("");
    setVehicleType("");
    setVehicleNumber("");
    setDrivingLicenseNumber("");
    setDrivingLicense(null);
    setVehicleDocument(null);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Vehicle & Document Details
        </h2>

        {/* Vehicle Owner */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Vehicle Owner</label>
          <select
            value={vehicleOwner}
            onChange={(e) => setVehicleOwner(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select Owner</option>
            <option value="first">First Owner</option>
            <option value="second">Second Owner</option>
            <option value="third">Third Owner</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Vehicle Name */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Vehicle Name</label>
          <input
            type="text"
            placeholder="e.g. Bolero, Omni"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Vehicle Company */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Vehicle Company</label>
          <input
            type="text"
            placeholder="e.g. Tata, Mahindra"
            value={vehicleCompany}
            onChange={(e) => setVehicleCompany(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Vehicle Model Number */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Vehicle Model Number</label>
          <input
            type="text"
            placeholder="e.g. ZX200, DLX"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Vehicle Number */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Vehicle Number Plate</label>
          <input
            type="text"
            placeholder="e.g. GJ01AB1234"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Driving License Number */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Driving License Number</label>
          <input
            type="text"
            placeholder="e.g. GJ05202100012345"
            value={drivingLicenseNumber}
            onChange={(e) => setDrivingLicenseNumber(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Driving License File */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Driving License File</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setDrivingLicense(e.target.files[0])}
            className="w-full border rounded p-2"
          />
          {drivingLicense && (
            <p className="text-sm mt-1 text-green-700">
              Selected: {drivingLicense.name}
            </p>
          )}
        </div>

        {/* Vehicle Document */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Vehicle Document</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setVehicleDocument(e.target.files[0])}
            className="w-full border rounded p-2"
          />
          {vehicleDocument && (
            <p className="text-sm mt-1 text-green-700">
              Selected: {vehicleDocument.name}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
