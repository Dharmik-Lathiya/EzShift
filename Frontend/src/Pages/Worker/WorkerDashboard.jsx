import React, { useEffect, useRef, useState } from 'react';
import { FaCalendarDay, FaTasks, FaRupeeSign, FaChartLine, FaDollarSign, FaProjectDiagram, FaBell } from 'react-icons/fa';
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

  const [fcmToken, setFcmToken] = useState(null);
  const hasSentRef = useRef(false);

  useEffect(() => {
    if (fcmToken && !hasSentRef.current) {
      hasSentRef.current = true;

      fetch(`http://localhost:3000/Worker/FCMToken/${workerId}`, {
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
  const { notifications, addNotification, setTripId } = useSendWorkerNotification();
  
  useEffect(() => {
    let ignore = false;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/Worker/Profile/${workerId}`);
        const data = await res.json();
        console.log(data);
        if (!ignore) {
          setStats({
            assignedTrips: data.assignedTrips || 0,
            completedTrips: data.completedTrips || 0,
            earnings: data.earning || 0,
            spendMonth: data.spendMonth || 0,
            totalProjects: data.totalProjects || 0,
            sales: data.sales || 0,
            lineChart: data.lineChart || [],
            barChart: data.barChart || [],
            shift: data.shift || '10:00 AM - 6:00 PM',
            location: data.location || 'Sector 21, Mumbai',
            status: data.status || 'Available',
            name: data.name || 'Shifter',
            totalTrips: data.trips.length,
          });
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
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        label: 'Total Spent',
        data: stats.lineChart.length ? stats.lineChart : [30000, 32000, 35000, 37000, 34000, 37500],
        borderColor: '#00a73e',
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: stats.barChart.length ? stats.barChart : [120, 135, 150, 145, 160, 170, 155],
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
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-3 font-semibold border-b">Notifications</div>
                <ul>
                  {notifications.map((n) => (
                    <li key={n.id} className="p-2 hover:bg-gray-100 text-sm">
                      <p className="font-semibold">{n.title}</p>
                      <p className="text-gray-600">{n.body}</p>
                    </li>
                  ))}

                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card icon={<FaCalendarDay />} title="Today's Shift" value={stats.shift} sub={stats.location} />
        <Card icon={<FaTasks />} title="Total Trips" value={stats.totalTrips} sub="Pickup, Drop, Confirm" />
        <Card icon={<FaRupeeSign />} title="Earnings" value={`₹${stats.earnings.toFixed(2)}`} sub="Today" />
        <Card icon={<FaDollarSign />} title="Spend this month" value={`₹${stats.spendMonth}`} sub="" />
        <Card icon={<FaProjectDiagram />} title="Total Projects" value={stats.totalProjects} sub="" />
        <Card icon={<FaChartLine />} title="Sales" value={`₹${stats.sales}`} sub="+23% since last month" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2 text-cyan-700">Monthly Spending</h2>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2 text-cyan-700">Weekly Revenue</h2>
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