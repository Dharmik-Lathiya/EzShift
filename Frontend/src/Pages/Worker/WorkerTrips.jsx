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
  const [submitting, setSubmitting] = useState(false);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/Worker/Trip/GetAll/${workerId}`;
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
      `${import.meta.env.VITE_BACKEND_URL}/Worker/Vehicle/Active/${workerId}?vehicleType=${vehicleType}`
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
      setSubmitting(true);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Worker/Trip/Accept`, {
        tripId: selectedTrip,
        workerId,
        vehicleId: vehicleId,
      });
      toast.success("Trip accepted");
      setShowVehicleSelection(false);
      fetchTrips(); 
    } catch (error) {
      console.error("Error accepting trip:", error);
      toast.error("Error accepting trip");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async (tripId) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Worker/Trip/Decline`, {
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
      setSubmitting(true);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Worker/Trip/Start/${tripId}`,{
        workerId: workerId,
        vehicleId: vehicleId,
      });
      toast.success("Trip assigned");
      fetchTrips();
    } catch (error) {
      toast.error("Error assigning trip");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteTrip = async (tripId) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Worker/Trip/Complete/${tripId}`, {
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Trips</h2>
          <p className="text-sm text-gray-500">Manage and track your assigned trips</p>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border rounded-lg p-2 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {["Pending", "Assigned", "InProgress", "Completed", "Paid"].map((tab) => {
              const count = trips.filter((t) => t.status === tab).length;
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} inline-flex items-center gap-2 px-4 py-2 rounded-md transition`}
                >
                  <span className="font-medium">{tab}</span>
                  <span className={`${isActive ? "bg-white/20" : "bg-gray-200"} text-xs px-2 py-0.5 rounded-full`}>{count}</span>
                </button>
              );
            })}
            <button
              onClick={fetchTrips}
              className="ml-auto bg-white text-gray-700 hover:bg-gray-50 border px-3 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg shadow-sm bg-white animate-pulse">
                <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-4 h-9 w-28 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="border rounded-lg bg-white p-10 text-center text-gray-600">
            <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">🗂️</div>
            <p className="font-medium">No {activeTab} trips</p>
            <p className="text-sm text-gray-500">Trips will appear here once available.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTrips.map((trip) => {
              const totalFare = trip.pricing?.total ? parseInt(trip.pricing.total) || 0 : 0;
              return (
                <div key={trip._id} className="p-4 border rounded-lg shadow-sm bg-white flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-500">From</div>
                      <div className="font-semibold text-gray-800">{trip.pickupAddress}</div>
                      <div className="text-xs uppercase tracking-wide text-gray-500 mt-2">To</div>
                      <div className="font-semibold text-gray-800">{trip.dropAddress}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Fare</div>
                      <div className="text-lg font-bold text-gray-900">₹{totalFare}</div>
                      <span className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${trip.status === "Pending" ? "bg-yellow-100 text-yellow-700" : trip.status === "Assigned" ? "bg-blue-100 text-blue-700" : trip.status === "InProgress" ? "bg-purple-100 text-purple-700" : trip.status === "Completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {trip.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                    <div>
                      <div className="text-xs text-gray-500">Date</div>
                      <div>{new Date(trip.date).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Time</div>
                      <div>{trip.timeSlot}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Vehicle Type</div>
                      <div>{trip.vehicleType || "-"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Vehicle</div>
                      <div>{trip.vehicleId?.vehicleName || "-"}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    {activeTab === "Pending" && (
                      <>
                        <button
                          onClick={() => selectVehicle(trip._id, trip.vehicleType)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-60"
                          disabled={submitting}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecline(trip._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-60"
                          disabled={submitting}
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {trip.status === "Assigned" && (
                      <button
                        onClick={() => handleStartTrip(trip._id, trip.vehicleId._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
                        disabled={submitting}
                      >
                        Start Trip
                      </button>
                    )}
                    {trip.status === "InProgress" && (
                      <button
                        onClick={() => handleCompleteTrip(trip._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-60"
                        disabled={submitting}
                      >
                        Complete
                      </button>
                    )}
                    {trip.status === "Completed" && (
                      <span className="text-gray-500 text-sm">Completed</span>
                    )}
                    {trip.status === "Paid" && (
                      <span className="text-gray-500 text-sm">Paid</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Vehicle selection modal */}
      {showVehicleSelection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => !submitting && setShowVehicleSelection(false)}></div>
          <div className="relative bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Select Vehicle</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowVehicleSelection(false)}
                disabled={submitting}
              >
                ✕
              </button>
            </div>
            {avaliableVehicles.length === 0 ? (
              <div className="text-sm text-gray-600">No vehicles available.</div>
            ) : (
              <ul className="divide-y max-h-72 overflow-y-auto">
                {avaliableVehicles.map((vehicle) => (
                  <li key={vehicle._id} className="py-3 flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="font-medium text-gray-800 truncate">{vehicle.vehicleName}</div>
                      <div className="text-sm text-gray-500">Type: {vehicle.vehicleType}</div>
                      {vehicle.registrationNumber && (
                        <div className="text-xs text-gray-400">Reg: {vehicle.registrationNumber}</div>
                      )}
                    </div>
                    <button
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-60"
                      onClick={() => handleAccept(vehicle._id)}
                      disabled={submitting}
                    >
                      {submitting ? "Assigning..." : "Assign"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );

}
