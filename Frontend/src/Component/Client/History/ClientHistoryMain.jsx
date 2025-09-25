import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

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
  console.log("Done");
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
    if (normalized === "pending") classes = "bg-yellow-100 text-yellow-800";
    else if (normalized === "assigned" || normalized === "inprogress" || normalized === "on the way" || normalized === "ontheway") classes = "bg-blue-100 text-blue-800";
    else if (normalized === "completed" || normalized === "paid") classes = "bg-green-100 text-green-800";
    else if (normalized === "cancelled" || normalized === "canceled") classes = "bg-red-100 text-red-800";
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${classes}`}>{status}</span>;
  };

  const totalInProgressPages = Math.ceil(
    inProgressTrips.length / inProgressRowsPerPage
  );
  const startIndexInProgress =
    (inProgressCurrentPage - 1) * inProgressRowsPerPage;
  const displayedInProgressTrips = inProgressTrips.slice(
    startIndexInProgress,
    startIndexInProgress + inProgressRowsPerPage
  );

  const totalCompletedPages = Math.ceil(
    completedTrips.length / completedRowsPerPage
  );
  const startIndexCompleted =
    (completedCurrentPage - 1) * completedRowsPerPage;
  const displayedCompletedTrips = completedTrips.slice(
    startIndexCompleted,
    startIndexCompleted + completedRowsPerPage
  );

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

  return (
    <section className="py-20 px-10">
      <div className="mb-5">
        <h1 className="text-4xl font-semibold">My moves</h1>
      </div>
      {paymentStatus && (
        <div className={`mb-6 rounded-md border p-4 ${paymentStatus === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
          <p className="font-medium">
            Payment {paymentStatus === "success" ? "Successful" : "Failed"}
          </p>
          <p className="text-sm mt-1">Transaction ID: <span className="font-mono">{txnid}</span></p>
        </div>
      )}
      {loading ? (
        <div className="space-y-6">
          <div className="h-10 w-64 bg-gray-100 animate-pulse rounded" />
          <div className="h-40 w-full bg-gray-100 animate-pulse rounded" />
          <div className="h-10 w-64 bg-gray-100 animate-pulse rounded" />
          <div className="h-40 w-full bg-gray-100 animate-pulse rounded" />
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Current Trips</h2>
            <div className=" flex items-center w-full ">
              <div className="bg-sky-100 mb-5 rounded-lg p-1 text-lg w-full flex items-center" >
                <i className="fa-solid fa-magnifying-glass m-3"></i>
                <input type="text" name="" id="" placeholder="Search by address" className="flex-1 bg-transparent focus:outline-none px-2 py-1" value={inProgressSearchQuery} onChange={(e) => setInProgressSearchQuery(e.target.value)} />
              </div>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <label className="font-semibold">Rows per page:</label>
              <select
                value={inProgressRowsPerPage}
                onChange={(e) => {
                  setInProgressRowsPerPage(parseInt(e.target.value));
                  setInProgressCurrentPage(1);
                }}
                className="border px-2 py-1 rounded"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="border-1 border-black rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-300">
                <thead className="text-left">
                  <tr className="bg-sky-100">
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Pickup Address</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Drop Address</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Vehicle Type</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Time Slot</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Status</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Total Price</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Note</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y-1 ">
                  {displayedInProgressTrips.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                        No trips found.
                      </td>
                    </tr>
                  ) : (
                    displayedInProgressTrips.map((trip) => (
                      <tr key={trip._id || `${trip.pickupAddress}-${trip.date}` } className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.pickupAddress || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.dropAddress || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.vehicleType || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.timeSlot || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{renderStatusPill(trip.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{formatCurrency(trip.pricing?.total)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{(trip.note || "").length > 0 ? `${(trip.note || "").substring(0, 30)}${(trip.note || "").length > 30 ? "..." : ""}` : "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.date ? new Date(trip.date).toLocaleDateString() : "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {totalInProgressPages > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => goToPage(1, 'inProgress')}
                  disabled={inProgressCurrentPage === 1}
                >
                  First
                </button>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => goToPage(inProgressCurrentPage - 1, 'inProgress')}
                  disabled={inProgressCurrentPage === 1}
                >
                  Prev
                </button>
                <span className="px-3 py-1 border rounded">
                  Page {inProgressCurrentPage} of {totalInProgressPages}
                </span>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => goToPage(inProgressCurrentPage + 1, 'inProgress')}
                  disabled={inProgressCurrentPage === totalInProgressPages}
                >
                  Next
                </button>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => goToPage(totalInProgressPages, 'inProgress')}
                  disabled={inProgressCurrentPage === totalInProgressPages}
                >
                  Last
                </button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Completed Trips</h2>
            <div className=" flex items-center w-full ">
              <div className="bg-sky-100 mb-5 rounded-lg p-1 text-lg w-full flex items-center" >
                <i className="fa-solid fa-magnifying-glass m-3"></i>
                <input type="text" name="" id="" placeholder="Search by address" className="flex-1 bg-transparent focus:outline-none px-2 py-1" value={completedSearchQuery} onChange={(e) => setCompletedSearchQuery(e.target.value)} />
              </div>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <label className="font-semibold">Rows per page:</label>
              <select
                value={completedRowsPerPage}
                onChange={(e) => {
                  setCompletedRowsPerPage(parseInt(e.target.value));
                  setCompletedCurrentPage(1);
                }}
                className="border px-2 py-1 rounded"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="border-1 border-black rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-300">
                <thead className="text-left">
                  <tr className="bg-sky-100">
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Pickup Address</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Drop Address</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Vehicle Type</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Time Slot</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Status</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Total Price</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Note</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Date</th>
                    <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-1 ">
                  {displayedCompletedTrips.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                        No trips found.
                      </td>
                    </tr>
                  ) : (
                    displayedCompletedTrips.map((trip) => (
                      <tr key={trip._id || `${trip.pickupAddress}-${trip.date}` } className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.pickupAddress || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.dropAddress || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.vehicleType || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.timeSlot || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{renderStatusPill(trip.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{formatCurrency(trip.pricing?.total)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{(trip.note || "").length > 0 ? `${(trip.note || "").substring(0, 30)}${(trip.note || "").length > 30 ? "..." : ""}` : "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{trip.date ? new Date(trip.date).toLocaleDateString() : "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">
                          {trip.isPaid ? (
                            <button className="text-blue-600 hover:underline">View</button>
                          ) : (
                            <button
                              className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                              onClick={() => handlePayment(trip)}
                            >
                              Pay {formatCurrency(trip.pricing?.total)}
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
              <div className="mt-4 flex justify-center gap-2">
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => goToPage(1, 'completed')}
                  disabled={completedCurrentPage === 1}
                >
                  First
                </button>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => goToPage(completedCurrentPage - 1, 'completed')}
                  disabled={completedCurrentPage === 1}
                >
                  Prev
                </button>
                <span className="px-3 py-1 border rounded">
                  Page {completedCurrentPage} of {totalCompletedPages}
                </span>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => goToPage(completedCurrentPage + 1, 'completed')}
                  disabled={completedCurrentPage === totalCompletedPages}
                >
                  Next
                </button>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => goToPage(totalCompletedPages, 'completed')}
                  disabled={completedCurrentPage === totalCompletedPages}
                >
                  Last
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
