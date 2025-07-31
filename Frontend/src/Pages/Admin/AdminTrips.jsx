import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTripId, setUpdatingTripId] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/Admin/Trip/GetAll');
      if (Array.isArray(res.data.data)) {
        setTrips(res.data.data);
      } else {
        console.warn('Expected array in res.data.data but got:', res.data);
        setTrips([]);
      }
    } catch (err) {
      console.error('Error fetching trips:', err);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (tripId) => {
    setUpdatingTripId(tripId);
    try {
      await axios.put(`http://localhost:3000/Admin/Trip/Accept/${tripId}`, {
        isAccept: true,
      });

      await fetchTrips();
    } catch (error) {
      console.error('Error updating trip status:', error);
    } finally {
      setUpdatingTripId(null);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Trips</h1>
      {loading ? (
        <div>Loading...</div>
      ) : trips.length === 0 ? (
        <div>No trips found.</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Trip ID</th>
              <th className="border px-4 py-2">Pickup</th>
              <th className="border px-4 py-2">Destination</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Vehicle</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip._id}>
                <td className="border px-4 py-2">{trip.clientId}</td>
                <td className="border px-4 py-2">{trip.pickupAddress}</td>
                <td className="border px-4 py-2">{trip.dropAddress}</td>
                <td className="border px-4 py-2">
                  {trip.date ? new Date(trip.date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="border px-4 py-2">{trip.vehicleType || 'N/A'}</td>
                <td className="border px-4 py-2">
                  {trip.isAccept === true ? (
                    <span className="text-green-600 font-semibold">Accepted</span>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAccept(trip._id)}
                      disabled={updatingTripId === trip._id}
                    >
                      {updatingTripId === trip._id ? 'Accepting...' : 'Accept'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
