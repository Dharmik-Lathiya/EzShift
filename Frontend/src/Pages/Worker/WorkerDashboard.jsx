import React, { useEffect, useRef, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler } from 'chart.js';
import { requestFCMToken, listenForMessages } from '../../../public/firebase';
import { getMessaging, onMessage } from 'firebase/messaging';
import { messaging } from '../../firebase-config.js';
import useSendWorkerNotification from '../../store/useSendWorkerNotification.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

export default function WorkerDashboard() {
  const workerId = localStorage.getItem('workerId') || '12345';

  const [stats, setStats] = useState({
    assignedTrips: 0,
    completedTrips: 0,
    earnings: 0,
    spendMonth: 0,
    totalProjects: 0,
    sales: 0,
    lineChart: [],
    barChart: [],
    shift: '',
    location: '',
    status: 'Available',
    name: 'Worker',
    totalTrips: 0,
    Filler,
  });
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [fcmToken, setFcmToken] = useState(null);
  const hasSentRef = useRef(false);

  useEffect(() => {
    if (fcmToken && !hasSentRef.current) {
      hasSentRef.current = true;

      fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/FCMToken/${workerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fcmToken }),
      })
        .then((response) => {
          if (!response.ok) throw new Error('Failed to send FCM token');
          return response.json();
        })
        .then((data) => console.log('FCM token sent successfully:', data))
        .catch((error) => console.error('Error sending FCM token:', error));
    }
  }, [fcmToken, workerId]);

  const [showNotifications, setShowNotifications] = useState(false);
  // Global state for notifications
  const { notifications, addNotification, setTripId, markSeen } = useSendWorkerNotification();
  
  useEffect(() => {
    let ignore = false;

    const fetchVehicleCounter = async () => {
      try {
        const vehicleCounter = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Vehicle/Fetch/${workerId}`);
        const vehicleData = await vehicleCounter.json();
        if (vehicleData.vehicles) {
          setVehicleCount(vehicleData.vehicles.length);
        }
      } catch (e) {
        console.error("Error fetching vehicles", e);
      }
    };
    fetchVehicleCounter();

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Profile/${workerId}`);
        const data = await res.json();
        // Fallback mappings from provided user shape
        const fullName = data.fullname || data.name || 'Shifter';
        const locationText = [data.address, data.city].filter(Boolean).join(', ') || data.location || '';
        const earningsValue = typeof data.earning === 'number' ? data.earning : data.earnings || 0;
        const totalTripsCount = Array.isArray(data.trips) ? data.trips.length : data.totalTrips || 0;
        if (!ignore) {
          setStats({
            assignedTrips: data.assignedTrips || 0,
            completedTrips: data.completedTrips || 0,
            earnings: earningsValue,
            spendMonth: data.spendMonth || 0,
            totalProjects: data.totalProjects || 0,
            sales: data.sales || 0,
            lineChart: data.lineChart || [],
            barChart: data.barChart || [],
            shift: data.shift || '10:00 AM - 6:00 PM',
            location: locationText || '—',
            status: data.status || 'Available',
            name: fullName,
            totalTrips: totalTripsCount,
          });
        }

        try {
          const tripsRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Trip/GetAll/${workerId}`);
          const tripsData = await tripsRes.json();

          let compTrips = 0;
          if (tripsData.trips && Array.isArray(tripsData.trips)) {
            tripsData.trips.forEach(trip => {
              if (trip.status === 'Completed' || trip.status === 'Paid') {
                compTrips++;
              }
            });
            if (!ignore) {
              setCompletedTrips(compTrips);
              setTrips(tripsData.trips);
              const { weeklyCounts, monthlyEarnings } = buildChartsFromTrips(tripsData.trips);
              setStats((prev) => ({
                ...prev,
                barChart: weeklyCounts.values,
                lineChart: monthlyEarnings.values,
              }));
            }
          }
        } catch (e) {
          console.error('Error fetching trips for charts', e);
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    if (workerId) {
      fetchStats();
    }

    return () => {
      ignore = true;
    };
  }, [workerId]);


  useEffect(() => {
    const fetchFcmToken = async () => {
      console.log('Requesting FCM token...');
      const token = await requestFCMToken();
      if (token) {
        console.log('FCM Token:', token);
        setFcmToken(token);
      } else {
        console.log('FCM token not received.');
      }
    };
    fetchFcmToken();
  }, []);

   // Foreground messages
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📩 Foreground FCM:", payload);

      const { title, body } = payload.notification || {};
      const tripId = payload.data?.tripId;

      setTripId(tripId);
      // Add to global state
      addNotification({ id: Date.now(), title, body });
    });

    return () => unsubscribe();
  }, [setTripId, addNotification]);

  // Background messages from SW
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleMessage = (event) => {
      if (event.data && event.data.type === "NEW_NOTIFICATION") {
        console.log("Received notification from service worker:", event.data);
        const { tripId, title, body } = event.data;

        setTripId(tripId);
        // Add to global state
        addNotification({ id: Date.now(), title, body });
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
  }, [setTripId, addNotification]);


  const lineChartData = {
    labels: getLastSixMonthsLabels(),
    datasets: [
      {
        label: 'Monthly Earnings',
        data: stats.lineChart.length ? stats.lineChart : [0, 0, 0, 0, 0, stats.earnings || 0],
        borderColor: '#19a1e5',
        backgroundColor: 'rgba(25, 161, 229, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#19a1e5',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const barChartData = {
    labels: getLastSevenDaysLabels(),
    datasets: [
      {
        label: 'Trips per day',
        data: stats.barChart.length ? stats.barChart : [0, 0, 0, 0, 0, 0, trips.length || 0],
        backgroundColor: '#19a1e5',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { border: { display: false }, grid: { color: '#f3f4f6' }, beginAtZero: true },
      x: { border: { display: false }, grid: { display: false } },
    }
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <div className="text-gray-500 font-medium flex items-center gap-2">
        <i className="fa-solid fa-circle-notch fa-spin text-primary"></i> Loading dashboard...
      </div>
    </div>
  );

  return (
    <div className="min-h-full">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Welcome, {stats.name}</h1>
          <p className="text-gray-500 mt-1">Here's an overview of your activity and earnings.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <div className={`w-2.5 h-2.5 rounded-full ${stats.status === 'Available' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-gray-700">{stats.status}</span>
          </div>
          <div className="relative">
            <button
              className="relative w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="fa-regular fa-bell"></i>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <span className="font-semibold text-gray-900">Notifications</span>
                  <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{notifications.length}</span>
                </div>
                <ul className="max-h-[300px] overflow-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className={`p-4 text-sm flex items-start gap-3 border-b border-gray-50 ${n.seen ? 'bg-white' : 'bg-primary-light/30'}`}>
                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.seen ? 'bg-gray-300' : 'bg-primary'}`}></div>
                      <div className="flex-1">
                        <p className={`font-semibold mb-0.5 ${n.seen ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</p>
                        <p className={`text-xs ${n.seen ? 'text-gray-500' : 'text-gray-600'}`}>{n.body}</p>
                      </div>
                      <button
                        className={`ml-2 text-xs font-medium transition-colors ${n.seen ? 'text-gray-400 hover:text-gray-600' : 'text-primary hover:text-blue-700'}`}
                        onClick={() => markSeen(n.id, !n.seen)}
                      >
                        {n.seen ? 'Mark unread' : 'Mark read'}
                      </button>
                    </li>
                  ))}
                  {notifications.length === 0 && (
                    <li className="p-6 text-sm text-gray-500 text-center">You're all caught up.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card icon="fa-clock" iconColor="text-orange-500" bgColor="bg-orange-50" title="Current Shift" value={stats.shift} sub={stats.location} />
        <Card icon="fa-route" iconColor="text-primary" bgColor="bg-primary-light" title="Total Trips" value={stats.totalTrips} sub="Lifetime" />
        <Card icon="fa-wallet" iconColor="text-green-600" bgColor="bg-green-50" title="Total Earnings" value={`₹${Number(stats.earnings || 0).toFixed(2)}`} sub="Lifetime" />
        <Card icon="fa-location-dot" iconColor="text-purple-500" bgColor="bg-purple-50" title="Primary City" value={stats.location.split(', ').pop() || '—'} sub="Operational area" />
        <Card icon="fa-truck" iconColor="text-indigo-500" bgColor="bg-indigo-50" title="Active Vehicles" value={vehicleCount} sub="Registered" />
        <Card icon="fa-check-circle" iconColor="text-teal-500" bgColor="bg-teal-50" title="Completed Trips" value={completedTrips} sub="Successfully delivered" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Monthly Earnings</h2>
            <p className="text-sm text-gray-500">Your revenue over the last 6 months</p>
          </div>
          <div className="h-[300px]">
             <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Weekly Trips</h2>
            <p className="text-sm text-gray-500">Trips completed in the last 7 days</p>
          </div>
          <div className="h-[300px]">
             <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon, iconColor, bgColor, title, value, sub }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor}`}>
          <i className={`fa-solid ${icon} text-xl ${iconColor}`}></i>
        </div>
        {sub && <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{sub}</span>}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

// Helpers
function getLastSevenDaysLabels() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const labels = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    labels.push(days[d.getDay()]);
  }
  return labels;
}

function getLastSixMonthsLabels() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(months[d.getMonth()]);
  }
  return labels;
}

function buildChartsFromTrips(tripList) {
  const last7 = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const from = new Date(now);
    from.setHours(0, 0, 0, 0);
    from.setDate(now.getDate() - i);
    const to = new Date(from);
    to.setDate(from.getDate() + 1);
    const count = tripList.filter((t) => {
      const dt = new Date(t.date);
      return dt >= from && dt < to;
    }).length;
    last7.push(count);
  }

  // Monthly earnings (last 6 months)
  const monthly = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const sum = tripList.reduce((acc, t) => {
      const dt = new Date(t.date);
      const amount = parseFloat(t?.pricing?.total || 0);
      const isCompleted = t.status === 'Completed' || t.status === 'Paid';
      if (dt >= monthStart && dt < nextMonthStart && isCompleted) {
        return acc + (isNaN(amount) ? 0 : amount);
      }
      return acc;
    }, 0);
    monthly.push(Math.round(sum));
  }

  return {
    weeklyCounts: { values: last7 },
    monthlyEarnings: { values: monthly },
  };
}