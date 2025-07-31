import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [earnings, setEarnings] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await fetch("http://localhost:3000/Admin/Trip/GetAll");
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const totalPricing = json.data.reduce((acc, trip) => {
            return acc + (Number(trip.pricing) || 0);
          }, 0);

          setEarnings(totalPricing);
          setTotalTrips(json.data.length);
        } else {
          console.warn("Unexpected response format:", json);
        }
      } catch (err) {
        console.error("Error fetching earnings:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Earnings</h2>
            <p className="text-2xl font-bold">₹{Math.trunc(earnings)}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Trips</h2>
            <p className="text-2xl font-bold">{totalTrips}</p>
          </div>
        </div>
      )}
    </div>
  );
}
