import axios from "axios";
import React, { useEffect, useState } from "react";

export default function WorkerTrips() {
  const workerId = localStorage.getItem("workerId") || "12345";

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("completed"); // default view

  const fetchTrips = async (type) => {
    setLoading(true);
    try {
      const url =
        type === "pending"
          ? `http://localhost:3000/Worker/Trip/Pending/${workerId}`
          : `http://localhost:3000/Worker/Trip/Completed/${workerId}`;

      const res = await axios.get(url);
      setTrips(res.data.trips || []);
    } catch (error) {
      console.error(`Error fetching ${type} trips:`, error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips(activeTab);
  }, [activeTab, workerId]);

  const handleAccept = async (tripId) => {
    try {
      await axios.post(`http://localhost:3000/Worker/Trip/Accept`, {
        tripId,
        workerId,
      });
      alert("Trip accepted ✅");
      setTrips(trips.filter((t) => t._id !== tripId));
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
      alert("Trip declined");
      setTrips(trips.filter((t) => t._id !== tripId));
    } catch (error) {
      console.error("Error declining trip:", error);
      alert("Error declining trip");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Trips</h2>

        {activeTab === "completed" && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setActiveTab("pending")}
          >
            Pending Trips
          </button>
        )}
        {activeTab === "pending" && (
        <div className="mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => setActiveTab("completed")}
          >
            Back to Completed Trips
          </button>
        </div>
      )}
      </div>

      {/* Trip list */}
      {loading ? (
        <p>Loading...</p>
      ) : trips.length === 0 ? (
        <p>No {activeTab} trips.</p>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
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
                  <strong>Fare:</strong> ₹
                  {trip.pricing?.total
                    ? parseInt(trip.pricing.total) || 0
                    : 0}
                </span>
                <span>
                  <strong>Status:</strong> {trip.status}
                </span>
              </div>

              {/* Buttons only for pending trips */}
              {activeTab === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(trip._id)}
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
            </div>
          ))}
        </div>
      )}

      {/* Back to Completed button when viewing pending */}
      
    </div>
  );
}
