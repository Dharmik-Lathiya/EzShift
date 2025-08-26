import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/Admin/User/GetAll`);
        if (Array.isArray(res.data.data)) {
          setUsers(res.data.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedUsers = users.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Registered Users</h1>

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
                  <th className="border px-4 py-2">Role</th>
                  <th className="border px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{user._id}</td>
                    <td className="border px-4 py-2">{user.fullName}</td>
                    <td className="border px-4 py-2">{user.emailId}</td>
                    <td className="border px-4 py-2">{user.mobileNo}</td>
                    <td className="border px-4 py-2">{user.role || 'User'}</td>
                    <td className="border px-4 py-2">
                      {new Date(user.createdAt).toLocaleDateString()}
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
