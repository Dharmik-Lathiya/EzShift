import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function WorkerTrips() {
  const workerId = localStorage.getItem("workerId") || "12345";

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
  const [avaliableVehicles, setAvaliableVehicles] = useState([]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:3000/Worker/Trip/GetAll/${workerId}`;
      const res = await axios.get(url);
      setTrips(res.data.trips || []);
      
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [workerId]);


  const selectVehicle = async (tripId, vehicleType) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/Worker/Vehicle/Active/${workerId}?vehicleType=${vehicleType}`
    );

    setSelectedTrip(tripId);
    setAvaliableVehicles(res.data.vehicles);
    setShowVehicleSelection(true);

  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("No vehicles available for this type.");
    } else {
      console.error("Error selecting vehicle:", error.message);
    }
  }
};

  const handleAccept = async (vehicleId) => {
    try {
      await axios.post(`http://localhost:3000/Worker/Trip/Accept`, {
        tripId: selectedTrip,
        workerId,
        vehicleId: vehicleId,
      });
      alert("Trip accepted");
      setShowVehicleSelection(false);
      fetchTrips(); 
    } catch (error) {
      console.error("Error accepting trip:", error);
      alert("Error accepting trip");
    }
  };

  const handleDecline = async (tripId) => {
    try {
      await axios.post(`http://localhost:3000/Worker/Trip/Decline`, {
        tripId,
        workerId,
      });
      toast.success("Trip declined");
      fetchTrips();
    } catch (error) {
      console.error("Error declining trip:", error);
      toast.error("Error declining trip");
    }
  };

  const handleStartTrip = async (tripId, vehicleId) => {
  
    try {
      await axios.post(`http://localhost:3000/Worker/Trip/Start/${tripId}`,{
        workerId: workerId,
        vehicleId: vehicleId,
      });
      toast.success("Trip assigned");
      fetchTrips();
    } catch (error) {
      toast.error("Error assigning trip");
    }
  };

  const handleCompleteTrip = async (tripId) => {
    try {
      await axios.post(`http://localhost:3000/Worker/Trip/Complete/${tripId}`, {
        workerId: workerId,
      });
      toast.success("Trip completed");
      fetchTrips();
    } catch (error) {
      console.error("Error completing trip:", error);
      alert("Error completing trip");
    }
  };

  const filteredTrips = trips.filter((trip) => trip.status === activeTab);
  if(activeTab === "Assigned"){
    console.log(filteredTrips);
  }

  return (
    <div className="p-4">
       <Toaster position="top-center" reverseOrder={false} />
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Trips</h2>

        {/* Tabs */}
        <div className="flex gap-2">
          {["Pending", "Assigned", "InProgress", "Completed", "Paid"].map(
            (tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Trip list */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredTrips.length === 0 ? (
        <p>No {activeTab} trips.</p>
      ) : (
        <div className="space-y-4">
          {showVehicleSelection && (
            <div className="p-4 border rounded shadow-md bg-white">
              <h3 className="text-lg font-bold mb-2">Select Vehicle</h3>
              <ul>
                {avaliableVehicles.map((vehicle) => (
                  <li key={vehicle._id}>
                    {vehicle._id} - {vehicle.vehicleName} - {vehicle.vehicleType}
                    <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleAccept(vehicle._id)}>Assign</button>
                  </li>

                ))}
              </ul>
            </div>
          )}
          {filteredTrips.map((trip) => (
            <div
              key={trip._id}
              className="p-4 border rounded shadow-md bg-white flex flex-row justify-between items-center gap-4"
            >
              {/* Trip details */}
              <div className="flex flex-wrap gap-6 text-sm">
                <span>
                  <strong>From:</strong> {trip.pickupAddress}
                </span>
                <span>
                  <strong>To:</strong> {trip.dropAddress}
                </span>
                <span>
                  <strong>Date:</strong>{" "}
                  {new Date(trip.date).toLocaleDateString()}
                </span>
                <span>
                  <strong>Time:</strong> {trip.timeSlot}
                </span>
                <span>
                  <strong>Vehicle Type:</strong> {trip.vehicleType || 0}
                </span>
                <span>
                  <strong>Vehicle:</strong> {trip.vehicleId?.vehicleName || 0}
                </span>
                <span>
                  <strong>Fare:</strong> ₹
                  {trip.pricing?.total
                    ? parseInt(trip.pricing.total) || 0
                    : 0}
                </span>
                <span>
                  <strong>Status:</strong> {trip.status}
                </span>
                {
                  trip.status !== "Pending" && (
                    <span>
                      <strong>Vehicle:</strong> {trip.vehicleName || 0}
                    </span>
                  )
                }
              </div>

              {activeTab === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => selectVehicle(trip._id,trip.vehicleType)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(trip._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Decline
                  </button>
                </div>
              )}
              {trip.status === "Assigned" && (
                <button
                  onClick={() => handleStartTrip(trip._id,trip.vehicleId._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                  Start Trip
                </button>
              )}
              {trip.status === "InProgress" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCompleteTrip(trip._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Complete
                  </button>
                </div>
              )}
              {trip.status === "Completed" && (
                <div className="flex gap-2">
                  <button>
                    <span className="text-gray-500">Completed</span>
                  </button>
                </div>
              )}
              {trip.status === "Paid" && (
                <div className="flex gap-2">
                  <button>
                    <span className="text-gray-500">Paid</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );

}
