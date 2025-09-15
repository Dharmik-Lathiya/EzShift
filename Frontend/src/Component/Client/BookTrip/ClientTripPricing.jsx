import React from 'react';
import useTripStore from '../../../store/useTripStore';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ClientTripPricing() {
  const {
    clientId,
    fullName,
    mobileNo,
    pickupAddress,
    dropAddress,
    date,
    timeSlot,
    vehicleType,
    needWorkers,
    numWorkers,
    note,
    distance,
    pricing
  } = useTripStore();

  if (!pricing || Object.keys(pricing).length === 0) return null;

const handleBooking = async () => {
  if (!clientId) {
    Swal.fire({
      icon: 'error',
      title: 'Booking failed',
      text: 'Please log in to book a trip.',
      confirmButtonText: 'OK'
    });
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/Client/BookTrip/`,
      {
        clientId,
        pickupAddress,
        dropAddress,
        date,
        timeSlot,
        vehicleType,
        needWorkers,
        numWorkers,
        note,
        distance,
        pricing
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    await Swal.fire({
      icon: 'success',
      title: 'Trip booked successfully!',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error('Booking failed:', error);

    await Swal.fire({
      icon: 'error',
      title: 'Booking failed',
      text: 'Please try again later.',
      confirmButtonText: 'OK'
    });
  }
};


  return (
    <div className="mt-6 p-4 bg-[#f0f3f4] rounded-xl max-w-md">
      <h3 className="text-lg font-bold text-[#111518] mb-2">Trip Pricing Breakdown</h3>
      <p>Distance: <strong>{distance} km</strong></p>
      <p>Base Charge: ₹{pricing?.base.toFixed(2) ?? 0}</p>
      <p>Vehicle Cost ({vehicleType}): ₹{pricing?.vehicle?.toFixed(2) ?? '0.00'}</p>
      {needWorkers && (
        <p>Worker Cost ({numWorkers} x ₹200): ₹{pricing?.workers ?? 0}</p>
      )}
      <hr className="my-2" />
      <div className="font-bold flex justify-between text-[#19a1e5] text-lg">
        <div>Total: ₹{pricing?.total.toFixed(2) ?? 0}</div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            onClick={handleBooking}
          >
            Book Trip
          </button>
        </div>
      </div>
    </div>
  );
}