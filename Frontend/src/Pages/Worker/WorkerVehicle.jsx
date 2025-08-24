import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function WorkerVehicle() {
  const [workerId, setWorkerId] = useState(localStorage.getItem("workerId"));
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  const [vehicleOwner, setVehicleOwner] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleCompany, setVehicleCompany] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [vehicleDocument, setVehicleDocument] = useState(null);
  const [vehicleType, setVehicleType] = useState("");


  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`http://localhost:3000/Vehicle/Fetch/${workerId}`);
      const data = await res.json();
      setVehicles(data.vehicles || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  const toggleStatus = async (index, id) => {
    const vehicle = vehicles[index];
    const updatedStatus = vehicle.status === "Active" ? "Inactive" : "Active";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change status to "${updatedStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, change to ${updatedStatus}`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/Vehicle/Status/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: updatedStatus }),
          });

          if (!res.ok) throw new Error("Failed to update status");

          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: `Vehicle status changed to ${updatedStatus}`,
            timer: 1500,
            showConfirmButton: false,
          });

          fetchVehicles();
        } catch (err) {
          console.error("Error updating vehicle status:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update status",
          });
        }
      }
    });
  };

  const vehicleOptions = [
    { value: 'miniTruck', name: 'Mini Truck' },
    { value: 'smallVan', name: 'Small Van' },
    { value: 'pickupTruck', name: 'Pickup Truck' },
    { value: 'mediumDutyTruck', name: 'Medium Duty Truck' },
    { value: 'containerTruck', name: 'Container Truck' },
    { value: 'openBodyTruck', name: 'Open Body Truck' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicleName || !vehicleNumber || !vehicleOwner) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("workerId", workerId);
    formData.append("vehicleOwner", vehicleOwner);
    formData.append("vehicleName", vehicleName);
    formData.append("vehicleCompany", vehicleCompany);
    formData.append("vehicleModel", vehicleModel);
    formData.append("vehicleType", vehicleType);
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("drivingLicenseNumber", drivingLicenseNumber);
    formData.append("ownerId", localStorage.getItem("workerId"));
    if (drivingLicense) formData.append("drivingLicense", drivingLicense);
    if (vehicleDocument) formData.append("vehicleDocument", vehicleDocument);

    await fetch("http://localhost:3000/Worker/Vehicle/Add", {
      method: "POST",
      body: formData,
    });
    toast.success("Vehicle added successfully!");

    setVehicleOwner("");
    setVehicleName("");
    setVehicleCompany("");
    setVehicleModel("");
    setVehicleType("");
    setVehicleNumber("");
    setDrivingLicenseNumber("");
    setDrivingLicense(null);
    setVehicleDocument(null);
    setShowForm(false);

    fetchVehicles();
  };

  const handleDeleteVehicle = async (vehicleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:3000/Vehicle/Delete/${vehicleId}`, {
            method: "POST",
          });
          toast.success("Vehicle deleted successfully!");
          fetchVehicles();
        } catch (err) {
          console.error("Error deleting vehicle:", err);
          toast.error("Error deleting vehicle.");
        }
      }
    });
  };

  const handleGetData = async (vehicleId) => {
    setShowForm(true);
    setIsEditing(true);
    setEditingVehicleId(vehicleId);

    try {
      const res = await fetch(`http://localhost:3000/Vehicle/Get/${vehicleId}`);
      const data = await res.json();

      if (res.ok) {
        setVehicleOwner(data.vehicle.vehicleOwner);
        setVehicleName(data.vehicle.vehicleName);
        setVehicleCompany(data.vehicle.vehicleCompany);
        setVehicleModel(data.vehicle.vehicleModel);
        setVehicleType(data.vehicle.vehicleType);
        setVehicleNumber(data.vehicle.vehicleNumber);
        setDrivingLicenseNumber(data.vehicle.drivingLicenseNumber);
        setDrivingLicense(null);
        setVehicleDocument(null);
      } else {
        throw new Error("Failed to fetch vehicle details");
      }
    } catch (err) {
      console.error("Error fetching vehicle details:", err);
      toast.error("Error fetching vehicle details.");
    }
  };


  const handleEditVehicle = async (e, vehicleId) => {
    e.preventDefault();
    e.stopPropagation();


    const res = await fetch(`http://localhost:3000/Vehicle/Edit/${vehicleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleOwner: vehicleOwner,
        vehicleName: vehicleName,
        vehicleCompany: vehicleCompany,
        vehicleModel: vehicleModel,
        vehicleType: vehicleType,
        vehicleNumber: vehicleNumber,
        drivingLicenseNumber: drivingLicenseNumber,
        drivingLicense: URL.createObjectURL(drivingLicense),
        vehicleDocument: URL.createObjectURL(vehicleDocument),
      })
    });



    if (res.ok) {
      toast.success("Vehicle updated successfully!");
      fetchVehicles();
      setVehicleOwner("");
      setVehicleName("");
      setVehicleCompany("");
      setVehicleModel("");
      setVehicleType("");
      setVehicleNumber("");
      setDrivingLicenseNumber("");
      setDrivingLicense(null);
      setVehicleDocument(null);

      setIsEditing(false);

      setShowForm(false);

      fetchVehicles();
    }


  };

  return (
    <div className="p-6 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-800">
          Your Assigned Vehicles
        </h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-cyan-700 transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Vehicle"}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl mx-auto">
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

          <div className="mb-4">
            <label className="block font-medium mb-2">Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">-- Select Vehicle --</option>
              {vehicleOptions.map((vehicle) => (
                <option key={vehicle.value} value={vehicle.value}>
                  {vehicle.name}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Model Number */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Vehicle Model (Year)</label>
            <input
              type="text"
              placeholder="e.g. 2020,2021"
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
            onClick={(e) => {
              e.stopPropagation();
              isEditing
                ? handleEditVehicle(e, editingVehicleId)
                : handleSubmit(e);
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {isEditing ? "Update" : "Submit"}
          </button>

        </div>
      ) : (
        <div className="overflow-x-auto bg-white p-4 rounded shadow">
          <table className="w-full text-sm table-auto border-collapse border border-gray-200">
            <thead className="bg-cyan-50">
              <tr>
                {[
                  "Truck Name",
                  "Type",
                  "Number Plate",
                  "Model Year",
                  "Assigned Date",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="border border-gray-300 px-4 py-2 text-cyan-700 uppercase font-semibold text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr
                  key={index}
                  className="hover:bg-cyan-50 transition-colors duration-200"
                >
                  <td className="border border-gray-300 px-4 py-2 align-middle">
                    {vehicle.vehicleName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 align-middle">
                    {vehicle.vehicleType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 align-middle">
                    {vehicle.vehicleNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 align-middle text-center">
                    {vehicle.vehicleModel}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 align-middle text-center">
                    {vehicle.assignedDate
                      ? new Date(vehicle.assignedDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 align-middle text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-white text-xs font-semibold ${vehicle.status === "Active"
                        ? "bg-green-600"
                        : "bg-red-600"
                        }`}
                      onClick={() => toggleStatus(index, vehicle._id)}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="flex gap-1 border border-gray-300 px-4 py-4 align-middle text-center">
                    <button
                      aria-label={`Toggle status of ${vehicle.vehicleName}`}
                      className="bg-cyan-600 text-white px-3 py-1 rounded hover:bg-cyan-700 text-xs font-semibold transition-colors duration-150"
                      onClick={() => handleGetData(vehicle._id)}
                    >
                      Edit
                    </button>
                    <button
                      aria-label={`Toggle status of ${vehicle.vehicleName}`}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs font-semibold transition-colors duration-150"
                      onClick={() => handleDeleteVehicle(vehicle._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}