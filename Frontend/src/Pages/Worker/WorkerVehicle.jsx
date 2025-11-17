import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function WorkerVehicle() {
  const [workerId, setWorkerId] = useState(localStorage.getItem("workerId"));
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [vehicleOwner, setVehicleOwner] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleCompany, setVehicleCompany] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleDocument, setVehicleDocument] = useState(null);
  const [vehicleType, setVehicleType] = useState("");


  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Vehicle/Fetch/${workerId}`);
      const data = await res.json();
      setVehicles(data.vehicles || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
    finally {
      setLoading(false);
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
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Vehicle/Status/${id}`, {
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

    // Frontend validation to match backend rules
    if (!vehicleName || !vehicleNumber || !vehicleOwner || !vehicleType || !vehicleModel || !vehicleCompany || !vehicleDocument) {
      toast.error("Please fill all required fields");
      return;
    }

    // Vehicle number format: e.g. GJ01AB1234
    const vehicleNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    if (!vehicleNumberRegex.test((vehicleNumber || '').toString().toUpperCase())) {
      toast.error("Invalid vehicle number format");
      return;
    }

    // Model year: 4 digits
    const modelYearRegex = /^[0-9]{4}$/;
    if (!modelYearRegex.test((vehicleModel || '').toString())) {
      toast.error("Invalid vehicle model year format");
      return;
    }

    // File validation: max 5MB, JPG/PNG only
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!vehicleDocument) {
      toast.error("Please upload vehicle document image");
      return;
    }

    if (vehicleDocument.size > MAX_SIZE) {
      toast.error("File size should not exceed 5MB.");
      return;
    }

    if (!allowedTypes.includes(vehicleDocument.type)) {
      toast.error("Only JPG and PNG images are allowed.");
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
    formData.append("ownerId", localStorage.getItem("workerId"));
    formData.append("vehicleDocument", vehicleDocument);

    try {
      setSubmitting(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Vehicle/Add`, {
        method: "POST",
        body: formData,
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok || data.success === false) {
        const msg = data.message || "Failed to add vehicle";
        toast.error(msg);
        return;
      }

      toast.success("Vehicle added successfully!");

      setVehicleOwner("");
      setVehicleName("");
      setVehicleCompany("");
      setVehicleModel("");
      setVehicleType("");
      setVehicleNumber("");
      setVehicleDocument(null);
      setShowForm(false);

      fetchVehicles();
    } catch (err) {
      console.error("Error adding vehicle:", err);
      toast.error(err?.message || "Error adding vehicle.");
    } finally {
      setSubmitting(false);
    }
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
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/Vehicle/Delete/${vehicleId}`, {
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Vehicle/Get/${vehicleId}`);
      const data = await res.json();

      if (res.ok) {
        setVehicleOwner(data.vehicle.vehicleOwner);
        setVehicleName(data.vehicle.vehicleName);
        setVehicleCompany(data.vehicle.vehicleCompany);
        setVehicleModel(data.vehicle.vehicleModel);
        setVehicleType(data.vehicle.vehicleType);
        setVehicleNumber(data.vehicle.vehicleNumber);
        setVehicleDocument(data.vehicle.vehicleDocument);
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


    setSubmitting(true);
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Vehicle/Edit/${vehicleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleOwner: vehicleOwner,
        vehicleName: vehicleName,
        vehicleCompany: vehicleCompany,
        vehicleModel: vehicleModel,
        vehicleType: vehicleType,
        vehicleNumber: vehicleNumber,
        vehicleDocument: vehicleDocument,
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
     
      setVehicleDocument(null);

      setIsEditing(false);

      setShowForm(false);

      fetchVehicles();
    }
    setSubmitting(false);


  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Vehicles</h2>
            <p className="text-sm text-gray-500">Manage vehicles and documents</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600 bg-white border rounded px-3 py-1.5">
              Total: <span className="font-semibold">{vehicles.length}</span>
            </div>
            <button
              className={`px-4 py-2 rounded shadow text-white ${showForm ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"} transition`}
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) {
                  setIsEditing(false);
                  setEditingVehicleId(null);
                }
              }}
            >
              {showForm ? "Close Form" : "Add Vehicle"}
            </button>
          </div>
        </div>

        {showForm ? (
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4">Vehicle & Document Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Vehicle Owner<span className="text-red-500">*</span></label>
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

              <div>
                <label className="block font-medium mb-1">Vehicle Name<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Bolero, Omni"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Vehicle Company</label>
                <input
                  type="text"
                  placeholder="e.g. Tata, Mahindra"
                  value={vehicleCompany}
                  onChange={(e) => setVehicleCompany(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Vehicle Type</label>
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

              <div>
                <label className="block font-medium mb-1">Vehicle Model (Year)</label>
                <input
                  type="text"
                  placeholder="e.g. 2020, 2021"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Vehicle Number Plate<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. GJ01AB1234"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Vehicle Document</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setVehicleDocument(e.target.files[0])}
                  className="w-full border rounded p-2"
                />
                {vehicleDocument && (
                  <div>
                    <p className="text-sm mt-1 text-green-700">Selected:</p>
                    <img src={vehicleDocument} height="100" width={100} />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              {isEditing && (
                <button
                  className="px-4 py-2 rounded border"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingVehicleId(null);
                    setShowForm(false);
                  }}
                  disabled={submitting}
                >
                  Cancel
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isEditing
                    ? handleEditVehicle(e, editingVehicleId)
                    : handleSubmit(e);
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? (isEditing ? "Updating..." : "Submitting...") : isEditing ? "Update" : "Submit"}
              </button>
            </div>

          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow border">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-4 border rounded animate-pulse">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-3/4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center text-gray-600 py-10">
                <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">🚚</div>
                <p className="font-medium">No vehicles found</p>
                <p className="text-sm text-gray-500">Add your first vehicle to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-auto border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Truck Name", "Type", "Number Plate", "Model Year", "Assigned Date", "Status", "Actions"].map((header) => (
                        <th key={header} className="border-b border-gray-200 px-4 py-3 text-gray-700 uppercase tracking-wide text-xs text-left">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border-b border-gray-100 px-4 py-3">{vehicle.vehicleName}</td>
                        <td className="border-b border-gray-100 px-4 py-3">{vehicle.vehicleType}</td>
                        <td className="border-b border-gray-100 px-4 py-3">{vehicle.vehicleNumber}</td>
                        <td className="border-b border-gray-100 px-4 py-3 text-center">{vehicle.vehicleModel}</td>
                        <td className="border-b border-gray-100 px-4 py-3 text-center">{vehicle.assignedDate ? new Date(vehicle.assignedDate).toLocaleDateString() : "-"}</td>
                        <td className="border-b border-gray-100 px-4 py-3 text-center">
                          <button
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${vehicle.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                            onClick={() => toggleStatus(index, vehicle._id)}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${vehicle.status === "Active" ? "bg-green-600" : "bg-red-600"}`}></span>
                            {vehicle.status}
                          </button>
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              aria-label={`Edit ${vehicle.vehicleName}`}
                              className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-xs font-semibold"
                              onClick={() => handleGetData(vehicle._id)}
                            >
                              Edit
                            </button>
                            <button
                              aria-label={`Delete ${vehicle.vehicleName}`}
                              className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 text-xs font-semibold"
                              onClick={() => handleDeleteVehicle(vehicle._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}