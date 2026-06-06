import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, CheckCircle, Clock, Truck } from "lucide-react";

export default function ClientHistoryMain() {

const [trips, setTrips] = useState([]);

 const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get("payment"); // "success" | "failure"
  const txnid = searchParams.get("txnid");


  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success(`Payment Successful Transaction ID: ${txnid}`);
    } else if (paymentStatus === "failure") {
      toast.error(`Payment Failed Transaction ID: ${txnid}`);
    }
  }, [paymentStatus, txnid]);

  const [inProgressTrips, setInProgressTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [inProgressSearchQuery, setInProgressSearchQuery] = useState("");
  const [completedSearchQuery, setCompletedSearchQuery] = useState("");

  const [inProgressCurrentPage, setInProgressCurrentPage] = useState(1);
  const [completedCurrentPage, setCompletedCurrentPage] = useState(1);

  const [inProgressRowsPerPage, setInProgressRowsPerPage] = useState(5);
  const [completedRowsPerPage, setCompletedRowsPerPage] = useState(5);

  const clientId = localStorage.getItem("clientId");

  const fetchTrips = (clientId) => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/Client/Trip/GetAll/${clientId}`)
      .then((response) => {
        setTrips(response.data.trips);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
        setTrips([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (clientId) {
      fetchTrips(clientId);
    }
  }, [clientId]);

  useEffect(() => {
    const filteredInProgress = trips.filter(
      (trip) =>
        (trip.status === "InProgress" || trip.status === "Pending" || trip.status === "Assigned") &&
        (trip.pickupAddress
          .toLowerCase()
          .includes(inProgressSearchQuery.toLowerCase()) ||
          trip.dropAddress
            .toLowerCase()
            .includes(inProgressSearchQuery.toLowerCase()))
    );
    setInProgressTrips(filteredInProgress);
    setInProgressCurrentPage(1);
  }, [trips, inProgressSearchQuery]);

  useEffect(() => {
    const filteredCompleted = trips.filter(
      (trip) =>
        (trip.status === "Completed" || trip.status === "Paid") &&
        (trip.pickupAddress
          .toLowerCase()
          .includes(completedSearchQuery.toLowerCase()) ||
          trip.dropAddress
            .toLowerCase()
            .includes(completedSearchQuery.toLowerCase()))
    );
    setCompletedTrips(filteredCompleted);
    setCompletedCurrentPage(1);
  }, [trips, completedSearchQuery]);

  const handlePayment = async (trip) => {
  const txnid = `TXN${Date.now()}`;
  const paymentDetails = {
    amount: trip.pricing.total,
    firstname: trip.fullName || "Guest",
    email: "test@example.com",
    productinfo: "EzShift Trip",
    txnid,
    tripId: trip._id
  };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/payu/Client/pay`,
      paymentDetails
    );

    if (res.data.success) {
      redirectToPayU(res.data.data);
    } else {
      toast.error("Payment initialization failed.");
    }
  } catch (error) {
    console.error(error);
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

  const formatCurrency = (value) => {
    const number = Number(value) || 0;
    try {
      return new Intl.NumberFormat(undefined, { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(number);
    } catch {
      return `₹${number.toLocaleString()}`;
    }
  };

  const renderStatusPill = (status) => {
    const normalized = (status || "").toLowerCase();
    let classes = "bg-gray-100 text-gray-700";
    let icon = null;
    
    if (normalized === "pending") {
      classes = "bg-yellow-50 text-yellow-700 border-yellow-200";
      icon = <Clock size={12} className="mr-1" />;
    }
    else if (normalized === "assigned" || normalized === "inprogress" || normalized === "on the way" || normalized === "ontheway") {
      classes = "bg-blue-50 text-blue-700 border-blue-200";
      icon = <Clock size={12} className="mr-1" />;
    }
    else if (normalized === "completed" || normalized === "paid") {
      classes = "bg-green-50 text-green-700 border-green-200";
      icon = <CheckCircle size={12} className="mr-1" />;
    }
    else if (normalized === "cancelled" || normalized === "canceled") {
      classes = "bg-red-50 text-red-700 border-red-200";
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${classes}`}>
        {icon} {status}
      </span>
    );
  };

  const totalInProgressPages = Math.ceil(inProgressTrips.length / inProgressRowsPerPage);
  const startIndexInProgress = (inProgressCurrentPage - 1) * inProgressRowsPerPage;
  const displayedInProgressTrips = inProgressTrips.slice(startIndexInProgress, startIndexInProgress + inProgressRowsPerPage);

  const totalCompletedPages = Math.ceil(completedTrips.length / completedRowsPerPage);
  const startIndexCompleted = (completedCurrentPage - 1) * completedRowsPerPage;
  const displayedCompletedTrips = completedTrips.slice(startIndexCompleted, startIndexCompleted + completedRowsPerPage);

  const goToPage = (page, table) => {
    if (table === "inProgress") {
      if (page < 1) page = 1;
      else if (page > totalInProgressPages) page = totalInProgressPages;
      setInProgressCurrentPage(page);
    } else {
      if (page < 1) page = 1;
      else if (page > totalCompletedPages) page = totalCompletedPages;
      setCompletedCurrentPage(page);
    }
  };

  const TableHeader = ({ headers }) => (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {headers.map((h, i) => (
          <th key={i} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Trip History</h1>
          <p className="mt-2 text-gray-600">Track your active trips and view your past booking records.</p>
        </div>

        {paymentStatus && (
          <div className={`p-4 rounded-xl border flex items-center justify-between shadow-sm ${paymentStatus === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            <div>
              <p className="font-semibold">
                Payment {paymentStatus === "success" ? "Successful" : "Failed"}
              </p>
              <p className="text-sm mt-1 opacity-90">Transaction ID: <span className="font-mono bg-white/50 px-2 py-0.5 rounded ml-1">{txnid}</span></p>
            </div>
            {paymentStatus === "success" && <CheckCircle size={24} className="opacity-80" />}
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg" />
            <div className="h-64 w-full bg-gray-200 animate-pulse rounded-2xl" />
          </div>
        ) : (
          <>
            {/* Active Trips Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">Active Trips</h2>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-full sm:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search active trips..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all text-sm"
                      value={inProgressSearchQuery} 
                      onChange={(e) => setInProgressSearchQuery(e.target.value)} 
                    />
                  </div>
                  <select
                    value={inProgressRowsPerPage}
                    onChange={(e) => {
                      setInProgressRowsPerPage(parseInt(e.target.value));
                      setInProgressCurrentPage(1);
                    }}
                    className="w-full sm:w-auto border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <TableHeader headers={["Date", "Pickup", "Dropoff", "Vehicle", "Time", "Price", "Status"]} />
                    <tbody className="divide-y divide-gray-100">
                      {displayedInProgressTrips.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                            <div className="flex flex-col items-center justify-center">
                              <Truck size={32} className="text-gray-300 mb-2" />
                              <p className="font-medium">No active trips found.</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        displayedInProgressTrips.map((trip) => (
                          <tr key={trip._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{trip.date ? new Date(trip.date).toLocaleDateString() : "-"}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate" title={trip.pickupAddress}>{trip.pickupAddress || "-"}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate" title={trip.dropAddress}>{trip.dropAddress || "-"}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trip.vehicleType || "-"}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{trip.timeSlot || "-"}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(trip.pricing?.total)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{renderStatusPill(trip.status)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {totalInProgressPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <span className="text-sm text-gray-500">Page {inProgressCurrentPage} of {totalInProgressPages}</span>
                    <div className="flex gap-2">
                      <button
                        className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        onClick={() => goToPage(inProgressCurrentPage - 1, 'inProgress')}
                        disabled={inProgressCurrentPage === 1}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        onClick={() => goToPage(inProgressCurrentPage + 1, 'inProgress')}
                        disabled={inProgressCurrentPage === totalInProgressPages}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Completed Trips Section */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">Completed Trips</h2>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-full sm:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search past trips..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all text-sm"
                      value={completedSearchQuery} 
                      onChange={(e) => setCompletedSearchQuery(e.target.value)} 
                    />
                  </div>
                  <select
                    value={completedRowsPerPage}
                    onChange={(e) => {
                      setCompletedRowsPerPage(parseInt(e.target.value));
                      setCompletedCurrentPage(1);
                    }}
                    className="w-full sm:w-auto border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <TableHeader headers={["Date", "Pickup", "Dropoff", "Vehicle", "Price", "Status", "Action"]} />
                    <tbody className="divide-y divide-gray-100">
                      {displayedCompletedTrips.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                            <div className="flex flex-col items-center justify-center">
                              <CheckCircle size={32} className="text-gray-300 mb-2" />
                              <p className="font-medium">No completed trips found.</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        displayedCompletedTrips.map((trip) => (
                          <tr key={trip._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{trip.date ? new Date(trip.date).toLocaleDateString() : "-"}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate" title={trip.pickupAddress}>{trip.pickupAddress || "-"}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate" title={trip.dropAddress}>{trip.dropAddress || "-"}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trip.vehicleType || "-"}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(trip.pricing?.total)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{renderStatusPill(trip.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {trip.isPaid || trip.status === "Paid" ? (
                                <span className="text-green-600 font-semibold flex items-center gap-1"><CheckCircle size={14}/> Paid</span>
                              ) : (
                                <button
                                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-sm"
                                  onClick={() => handlePayment(trip)}
                                >
                                  Pay Now
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {totalCompletedPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <span className="text-sm text-gray-500">Page {completedCurrentPage} of {totalCompletedPages}</span>
                    <div className="flex gap-2">
                      <button
                        className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        onClick={() => goToPage(completedCurrentPage - 1, 'completed')}
                        disabled={completedCurrentPage === 1}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        onClick={() => goToPage(completedCurrentPage + 1, 'completed')}
                        disabled={completedCurrentPage === totalCompletedPages}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
