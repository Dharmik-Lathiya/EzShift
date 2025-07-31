import React from 'react';
import { useTripsOnMount } from '../../../hooks/useTrips';

const SimpleTripList = () => {
  const { trips, loading, error, refreshTrips } = useTripsOnMount();

  if (loading) {
    return <div>Loading trips...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refreshTrips}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>All Trips ({trips.length})</h2>
      <button onClick={refreshTrips}>Refresh</button>
      
      {trips.length === 0 ? (
        <p>No trips found</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip._id || trip.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
              <h3>{trip.fullName}</h3>
              <p><strong>Phone:</strong> {trip.mobileNo}</p>
              <p><strong>Pickup:</strong> {trip.pickupAddress}</p>
              <p><strong>Drop:</strong> {trip.dropAddress}</p>
              <p><strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {trip.timeSlot}</p>
              <p><strong>Vehicle:</strong> {trip.vehicleType}</p>
              <p><strong>Distance:</strong> {trip.distance} km</p>
              <p><strong>Price:</strong> ₹{trip.pricing}</p>
              {trip.needWorkers && (
                <p><strong>Workers:</strong> {trip.numWorkers}</p>
              )}
              {trip.note && (
                <p><strong>Note:</strong> {trip.note}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleTripList; 