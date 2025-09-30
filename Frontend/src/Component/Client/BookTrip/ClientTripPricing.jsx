import React from 'react';
import useTripStore from '../../../store/useTripStore';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
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
      toast.error('Client ID is required.');
      return;
    }


    const bookingPromise = axios.post(
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
          "Content-Type": "application/json"
        }
      }
    );

    toast.promise(
      bookingPromise,
      {
        loading: "Booking your trip...",
        success: "Trip booked successfully!",
        error: "Booking failed. Please try again later."
      }
    );

    try {

      await bookingPromise;
    } catch (error) {
      console.error('Booking failed:', error);

    }
  };


  return (
    <div className="mt-6 p-4 bg-[#f0f3f4] rounded-xl max-w-md">
      <Toaster position="top-center" reverseOrder={false} />

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