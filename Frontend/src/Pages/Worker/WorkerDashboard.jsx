import React, { useEffect, useRef, useState } from 'react';
import { FaCalendarDay, FaTasks, FaRupeeSign, FaChartLine, FaDollarSign, FaProjectDiagram, FaBell, FaMap, FaMapMarked } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';
import { requestFCMToken, listenForMessages } from '../../../public/firebase';
import { getMessaging, onMessage } from 'firebase/messaging';
import { messaging } from '../../firebase-config.js';
import { Filler } from "chart.js";
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

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Profile/${workerId}`);
        const data = await res.json();
        console.log(data);
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
          const tripList = Array.isArray(tripsData.trips) ? tripsData.trips : [];
          if (!ignore) {
            setTrips(tripList);
            const { weeklyCounts, monthlyEarnings } = buildChartsFromTrips(tripList);
            setStats((prev) => ({
              ...prev,
              barChart: weeklyCounts.values,
              lineChart: monthlyEarnings.values,
            }));
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
        borderColor: '#00a73e',
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: getLastSevenDaysLabels(),
    datasets: [
      {
        label: 'Trips per day',
        data: stats.barChart.length ? stats.barChart : [0, 0, 0, 0, 0, 0, trips.length || 0],
        backgroundColor: ['#00a73e'],
      },
    ],
  };

  if (loading) return <div className="p-6 text-lg">Loading dashboard...</div>;

  return (
    <div className="p-6 from-cyan-50 to-blue-100 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6 relative">
        <h1 className="text-2xl font-semibold text-cyan-800">Welcome, {stats.name}</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-600">
            Status: <span className="text-green-600 font-semibold">{stats.status}</span>
          </span>
          <div className="relative">
            <button
              className="relative text-green-600 text-xl"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-3 font-semibold border-b flex items-center justify-between">
                  <span>Notifications</span>
                  <span className="text-xs text-gray-500">{notifications.length}/5</span>
                </div>
                <ul className="max-h-96 overflow-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className={`p-3 text-sm flex items-start gap-2 ${n.seen ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="flex-1">
                        <p className={`font-semibold ${n.seen ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</p>
                        <p className={`${n.seen ? 'text-gray-500' : 'text-gray-700'}`}>{n.body}</p>
                      </div>
                      <button
                        className={`ml-2 px-2 py-1 rounded text-xs border ${n.seen ? 'bg-gray-200 text-gray-700 border-gray-300' : 'bg-blue-600 text-white border-blue-600'}`}
                        onClick={() => markSeen(n.id, !n.seen)}
                        title={n.seen ? 'Mark as new' : 'Mark as seen'}
                      >
                        {n.seen ? 'Seen' : 'New'}
                      </button>
                    </li>
                  ))}
                  {notifications.length === 0 && (
                    <li className="p-3 text-sm text-gray-500">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card icon={<FaCalendarDay />} title="Shift" value={stats.shift} sub={stats.location} />
        <Card icon={<FaTasks />} title="Total Trips" value={stats.totalTrips} sub="All time" />
        <Card icon={<FaRupeeSign />} title="Total Earnings" value={`₹${Number(stats.earnings || 0).toFixed(2)}`} sub="All time" />
        <Card icon={<FaMapMarked />} title="City" value={stats.location.split(', ').pop() || '—'} sub="Current location" />
        <Card icon={<FaProjectDiagram />} title="Assigned Trips" value={stats.assignedTrips} sub="Active work" />
        <Card icon={<FaChartLine />} title="Completed Trips" value={stats.completedTrips} sub="Finished" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2 text-cyan-700">Monthly Earnings</h2>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2 text-cyan-700">Weekly Trips</h2>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, value, sub }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 border-l-4 border-green-600">
      <div className="text-2xl text-green-600">{icon}</div>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
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