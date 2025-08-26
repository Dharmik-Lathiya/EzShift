import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/Admin/Vehicle/GetAll`);
        if (res.data.success) {
          setVehicles(res.data.data);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(vehicles.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedVehicles = vehicles.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Vehicles</h2>

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
      ) : vehicles.length === 0 ? (
        <div>No vehicles found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Number Plate</th>
                  <th className="p-2 border">Model</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Owner</th>
                </tr>
              </thead>
              <tbody>
                {displayedVehicles.map((vehicle, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border">{vehicle.vehicleName}</td>
                    <td className="p-2 border">{vehicle.vehicleType}</td>
                    <td className="p-2 border">{vehicle.vehicleNumber}</td>
                    <td className="p-2 border">{vehicle.vehicleModel || "N/A"}</td>
                    <td className="p-2 border">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          vehicle.status === "Active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="p-2 border">{vehicle.ownerId?.fullname || "N/A"}</td>
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
