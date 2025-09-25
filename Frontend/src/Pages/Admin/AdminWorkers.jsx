import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminWorkers() {
  const [users, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/Admin/Worker/GetAll`);
        if (Array.isArray(res.data.data)) {
          setWorkers(res.data.data);
          console.log(res.data.data);
          
        } else {
          setWorkers([]);
        }
      } catch (error) {
        console.error("Failed to fetch Worker:", error);
        setWorkers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedUsers = users.slice(startIndex, startIndex + rowsPerPage);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/Admin/Worker/Delete/${id}`);
      if (res.data?.success) {
        setWorkers((prev) => prev.filter((u) => u._id !== id));
        toast.success('Worker deleted successfully');
      } else {
        toast.error(res.data?.message || 'Failed to delete worker');
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to delete worker');
    }
  };

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Registered Users</h1>
      <Toaster position="top-center" reverseOrder={false} />
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
      ) : users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">User ID</th>
                  <th className="border px-4 py-2">Full Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Mobile</th>
                  <th className="border px-4 py-2">Created At</th>
                  <th className="border px-4 py-2">Profile</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((worker) => (
                  <tr key={worker._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{worker._id}</td>
                    <td className="border px-4 py-2">{worker.fullname}</td>
                    <td className="border px-4 py-2">{worker.emailId}</td>
                    <td className="border px-4 py-2">{worker.mobileNo}</td>
                    <td className="border px-4 py-2">
                      {new Date(worker.createdAt).toLocaleDateString()}
                    </td>
                    <td className='border px-4 py-2' >
                      <img src={worker.avatar} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
                    </td>
                    <td className='border px-4 py-2'>
                      <button
                        onClick={() => handleDelete(worker._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
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
