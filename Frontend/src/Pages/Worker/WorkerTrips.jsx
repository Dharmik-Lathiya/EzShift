import React, { useEffect, useState } from 'react';

export default function WorkerTrips() {
  // Placeholder: Replace with actual worker ID from auth/session
  const workerId = 'WORKER_ID_PLACEHOLDER';

  const [availableTrips, setAvailableTrips] = useState([]);
  const [assignedTrips, setAssignedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch available (pending) trips and assigned trips
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        // Fetch available trips (pending, unassigned)
        const resAvailable = await fetch('/Worker/Trip/pending');
        const dataAvailable = await resAvailable.json();
        setAvailableTrips(dataAvailable.trips || []);

        // Fetch assigned trips for this worker
        const resAssigned = await fetch(`/api/worker/trips/assigned?workerId=${workerId}`); // Placeholder endpoint
        const dataAssigned = await resAssigned.json();
        setAssignedTrips(dataAssigned.trips || []);
      } catch (err) {
        setAvailableTrips([]);
        setAssignedTrips([]);
      }
      setLoading(false);
    };
    fetchTrips();
  }, [workerId]);

  // Accept a trip
  const handleAccept = async (tripId) => {
    try {
      await fetch('/Worker/Trip/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripId, workerId }),
      });
      window.location.reload();
    } catch (err) {
      alert('Failed to accept trip');
    }
  };

  // Complete a trip
  const handleComplete = async (tripId) => {
    try {
      await fetch('/Worker/Trip/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripId, workerId }),
      });
      window.location.reload();
    } catch (err) {
      alert('Failed to complete trip');
    }
  };

  if (loading) return <div className="p-6 text-lg">Loading trips...</div>;

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-cyan-800">Available Trips</h2>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {availableTrips.length === 0 && <div>No available trips.</div>}
        {availableTrips.map((trip) => (
          <div key={trip._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-cyan-400">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-800 font-medium">Pickup: <span className="text-black">{trip.pickupAddress}</span></p>
                <p className="text-gray-800 font-medium">Drop: <span className="text-black">{trip.dropAddress}</span></p>
              </div>
              <div className="text-sm text-gray-500">
                <p>{new Date(trip.date).toLocaleDateString()}</p>
                <p className="text-yellow-600">Pending</p>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">Distance: {trip.distance} km</div>
            <button
              className="mt-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
              onClick={() => handleAccept(trip._id)}
            >
              Accept Trip
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-cyan-800">My Assigned Trips</h2>
      <div className="grid grid-cols-1 gap-4">
        {assignedTrips.length === 0 && <div>No assigned trips.</div>}
        {assignedTrips.map((trip) => (
          <div key={trip._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-cyan-400">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-800 font-medium">Pickup: <span className="text-black">{trip.pickupAddress}</span></p>
                <p className="text-gray-800 font-medium">Drop: <span className="text-black">{trip.dropAddress}</span></p>
              </div>
              <div className="text-sm text-gray-500">
                <p>{new Date(trip.date).toLocaleDateString()}</p>
                <p className={trip.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>{trip.status}</p>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">Distance: {trip.distance} km</div>
            {trip.status !== 'Completed' && (
              <button
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleComplete(trip._id)}
              >
                Mark as Completed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
