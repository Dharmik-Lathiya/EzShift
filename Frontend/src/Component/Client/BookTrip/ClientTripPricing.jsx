import React from 'react';
import useTripStore from '../../../store/useTripStore';

export default function ClientTripPricing() {
  const { pricing, distance, vehicleType, needWorkers, numWorkers } = useTripStore();

  if (!pricing) return null;

  return (
    <div className="mt-6 p-4 bg-[#f0f3f4] rounded-xl max-w-md">
      <h3 className="text-lg font-bold text-[#111518] mb-2">Trip Pricing Breakdown</h3>
      <p>Distance: <strong>{distance} km</strong></p>
      <p>Base Charge: ₹{pricing.base}</p>
      <p>Vehicle Cost ({vehicleType}): ₹{pricing.vehicle.toFixed(2)}</p>
      {needWorkers && (
        <p>Worker Cost ({numWorkers} x ₹200): ₹{pricing.workers}</p>
      )}
      <hr className="my-2" />
      <div className="font-bold flex justify-between text-[#19a1e5] text-lg"><div>Total: ₹{pricing.total}</div><div>Pay Now</div></div>

    </div>
  );
}
