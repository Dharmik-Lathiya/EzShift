import React,{useState,useEffect} from 'react';
import { FaRupeeSign, FaTasks, FaChartLine, FaUsers } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

export default function AdminDashboard() {
  const [earnings, setEarnings] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [loading, setLoading] = useState(true);

  const [weeklyTripsSeries, setWeeklyTripsSeries] = useState([]);
  const [monthlyEarningsSeries, setMonthlyEarningsSeries] = useState([]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [adminRes, tripsRes, usersRes, workersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/Admin/Get/Profile`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/Admin/Trip/GetAll`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/Admin/User/GetAll`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/Admin/Worker/GetAll`),
        ]);

        const admin = adminRes.data?.data || {};
        const trips = Array.isArray(tripsRes.data?.data) ? tripsRes.data.data : [];
        const users = Array.isArray(usersRes.data?.data) ? usersRes.data.data : [];
        const workers = Array.isArray(workersRes.data?.data) ? workersRes.data.data : [];

        setEarnings(typeof admin.earning === 'number' ? admin.earning : 0);
        setTotalTrips(trips.length);
        setTotalUsers(users.length);
        setTotalWorkers(workers.length);

        const { weeklyCounts, monthlyEarnings } = buildChartsFromTrips(trips);
        setWeeklyTripsSeries(weeklyCounts.values);
        setMonthlyEarningsSeries(monthlyEarnings.values);
      } catch (err) {
        console.error('Error fetching admin dashboard stats:', err?.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);


  const lineChartData = {
    labels: getLastSixMonthsLabels(),
    datasets: [
      {
        label: 'Monthly Earnings',
        data: monthlyEarningsSeries.length ? monthlyEarningsSeries : [0, 0, 0, 0, 0, earnings || 0],
        borderColor: '#1447ec',
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
        data: weeklyTripsSeries.length ? weeklyTripsSeries : [0, 0, 0, 0, 0, 0, totalTrips || 0],
        backgroundColor: '#1447ec',
      },
    ],
  };

  return (
    <div className="p-6 from-cyan-50 to-blue-100 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-cyan-800">Admin Dashboard</h1>
        <span className="text-gray-600">Last updated: Today</span>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card icon={<FaRupeeSign />} title="Total Earnings" value={`₹${earnings.toLocaleString()}`} sub="All time" />
        <Card icon={<FaTasks />} title="Total Trips" value={totalTrips} sub="All time" />
        <Card icon={<FaUsers />} title="Total Users" value={totalUsers} sub="Registered clients" />
        <Card icon={<FaUsers />} title="Total Workers" value={totalWorkers} sub="Registered workers" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2 text-cyan-700">Earnings Overview</h2>
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
    <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 border-l-4 border-blue-600">
      <div className="text-2xl text-blue-600">{icon}</div>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

// Helpers
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getLastSevenDaysLabels() {
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
