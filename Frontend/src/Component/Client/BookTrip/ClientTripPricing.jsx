import React from 'react';
import useTripStore from '../../../store/useTripStore';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ClientTripPricing() {
const {
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
    pricing,
    clientId // <-- Make sure clientId is available from your store or context
  } = useTripStore();

  if (!pricing) return null;

  const handlePayment = async () => {
    const txnid = `TXN${Date.now()}`;
    const paymentDetails = {
      amount: pricing.total,
      firstname: fullName,
      email: "test@example.com", 
      productinfo: "EzShift Trip",
      txnid,
    };

    try {
      const res = await axios.post('http://localhost:3000/api/payu/Client/pay', paymentDetails);
      if (res.data.success) {
        // Store trip in DB before redirect (not recommended for real payments)
        await axios.post('http://localhost:3000/Client/Trip/Book', {
          clientId, // should be a valid ObjectId string
          fullName,
          mobileNo: Number(mobileNo), // ensure it's a number
          pickupAddress,
          dropAddress,
          date: new Date(date).toISOString(), // send as ISO string
          timeSlot,
          vehicleType,
          needWorkers: Boolean(needWorkers),
          numWorkers: Number(numWorkers),
          note,
          distance: Number(distance),
          pricing: Number(pricing.total) // if pricing is an object, use pricing.total
        });
        localStorage.setItem('tripDetails', JSON.stringify({
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
          pricing: pricing.total
        }));
        redirectToPayU(res.data.data);
      } else {
        toast.error("Payment initialization failed.");
      }
    } catch (error) {
      console.error(error); // Check your backend console for details!
      toast.error("Error processing payment.");
    }
  };

  function redirectToPayU(data) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://test.payu.in/_payment";

    for (let key in data) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  console.log("Trip data received:", {
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
});

  return (
    <div className="mt-6 p-4 bg-[#f0f3f4] rounded-xl max-w-md">
      <h3 className="text-lg font-bold text-[#111518] mb-2">Trip Pricing Breakdown</h3>
      <p>Distance: <strong>{distance} km</strong></p>
      <p>Base Charge: ₹{pricing.base}</p>
      <p>Vehicle Cost ({vehicleType}): ₹{pricing?.distance ? pricing.distance.toFixed(2) : 'N/A'}</p>
      {needWorkers && (
        <p>Worker Cost ({numWorkers} x ₹200): ₹{pricing.workers}</p>
      )}
      <hr className="my-2" />
      <div className="font-bold flex justify-between text-[#19a1e5] text-lg">
        <div>Total: ₹{pricing.total}</div>
        <div>
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
