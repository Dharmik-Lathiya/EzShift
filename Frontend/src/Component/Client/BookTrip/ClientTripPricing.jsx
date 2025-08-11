import React from 'react';
import useTripStore from '../../../store/useTripStore';
import axios from 'axios';
import { toast } from 'react-toastify';

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
      const payRes = await axios.post('http://localhost:3000/api/payu/Client/pay', paymentDetails);

      if (payRes.data.success) {
        const tripRes = await axios.post('http://localhost:3000/Client/Trip/Book', {
          clientId,
          fullName,
          mobileNo: Number(mobileNo),
          pickupAddress,
          dropAddress,
          date: new Date(date).toISOString(),
          timeSlot,
          vehicleType,
          needWorkers: Boolean(needWorkers),
          numWorkers: Number(numWorkers),
          note,
          distance: Number(distance),
          pricing: Number(pricing.total),
          vehicle: useTripStore.getState().vehicle
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

        redirectToPayU(payRes.data.data);
      } else {
        toast.error("Payment initialization failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking Error:", err.response?.data || err.message);


  if (err.response?.data?.message) {
    toast.error(err.response.data.message); // show proper backend message
  } else {
    toast.error("Error occurred while processing payment.");
  }
}

  };

 function redirectToPayU(data) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://test.payu.in/_payment"; // PayU sandbox URL

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


  return (
    <div className="mt-6 p-4 bg-[#f0f3f4] rounded-xl max-w-md">
      <h3 className="text-lg font-bold text-[#111518] mb-2">Trip Pricing Breakdown</h3>
      <p>Distance: <strong>{distance} km</strong></p>
      <p>Base Charge: ₹{pricing?.base ?? 0}</p>
      <p>Vehicle Cost ({vehicleType}): ₹{pricing?.distance?.toFixed(2) ?? '0.00'}</p>
      {needWorkers && (
        <p>Worker Cost ({numWorkers} x ₹200): ₹{pricing?.workers ?? 0}</p>
      )}
      <hr className="my-2" />
      <div className="font-bold flex justify-between text-[#19a1e5] text-lg">
        <div>Total: ₹{pricing?.total ?? 0}</div>
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
