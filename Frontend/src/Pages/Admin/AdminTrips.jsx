import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTripId, setUpdatingTripId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10); // rows per page
  const [currentPage, setCurrentPage] = useState(1); // pagination

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/Admin/Trip/GetAll");
      if (Array.isArray(res.data.data)) {
        setTrips(res.data.data);
      } else {
        setTrips([]);
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };


  // Pagination calculations
  const totalPages = Math.ceil(trips.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedTrips = trips.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Trips</h1>

      {/* Rows per page selector */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-semibold">Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(parseInt(e.target.value));
            setCurrentPage(1); // reset to first page
          }}
          className="border px-2 py-1 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : trips.length === 0 ? (
        <div>No trips found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Trip ID</th>
                  <th className="border px-4 py-2">Client Name</th>
                  <th className="border px-4 py-2">Mobile</th>
                  <th className="border px-4 py-2">Pickup</th>
                  <th className="border px-4 py-2">Destination</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Vehicle</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedTrips.map((trip) => (
                  <tr key={trip._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{trip._id || "N/A"}</td>
                    <td className="border px-4 py-2">{trip.clientId?.fullName || "N/A"}</td>
                    <td className="border px-4 py-2">{trip.clientId?.mobileNo || "N/A"}</td>
                    <td className="border px-4 py-2">{trip.pickupAddress || "N/A"}</td>
                    <td className="border px-4 py-2">{trip.dropAddress || "N/A"}</td>
                    <td className="border px-4 py-2">
                      {trip.date ? new Date(trip.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="border px-4 py-2">{trip.vehicle?.vehicleType || "N/A"}</td>
                    <td className="border px-4 py-2">
                      {trip.status === "Pending" ? (
                        <span className="text-yellow-600 font-semibold">Pending</span>
                      ) : trip.status === "Assigned" ? (
                        <span className="text-green-600 font-semibold">Assigned</span>
                      ) : trip.status === "InProgress" || trip.status === "Completed" || trip.status === "Paid" ? (
                        <span className="text-blue-600 font-semibold">{trip.status}</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Rejected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="mt-4 flex justify-center gap-2">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="px-3 py-1 border rounded">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );
}
