import axios from "axios";
import React, { useEffect, useState } from "react";

export default function WorkerTrips() {
  const workerId = localStorage.getItem("workerId") || "12345";
  const [trips, setTrips] = useState([]);

  // Fetch pending trips
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/Worker/Trip/Pending/${workerId}`
        );
        console.log("Pending Trips", res.data.trips);
        setTrips(res.data.trips || []);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, [workerId]);

  // Accept trip
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

  // Decline trip
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
      alert("Error declining trip ");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Trips</h2>

      {trips.length === 0 ? (
        <p>No pending trips.</p>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="p-4 border rounded shadow-md bg-white flex flex-row justify-between items-center gap-4"
            >
              {/* Trip details inline */}
              <div className="flex flex-wrap gap-6 text-sm">
                <span><strong>From:</strong> {trip.pickupAddress}</span>
                <span><strong>To:</strong> {trip.dropAddress}</span>
                <span><strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}</span>
                <span>
                  <strong>Fare:</strong> ₹
                  {trip.pricing?.total ? parseInt(trip.pricing.total) || 0 : 0}
                </span>
                <span><strong>Status:</strong> {trip.status}</span>
              </div>

              {/* Buttons inline */}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
