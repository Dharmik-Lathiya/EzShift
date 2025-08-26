


import React,{useState,useEffect} from 'react';
import { FaRupeeSign, FaTasks, FaChartLine, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

export default function AdminDashboard() {
  // Dummy Data (replace with API later)


   const [earnings, setEarnings] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/Admin/Get/Profile`);
        const data = res.data;
        const admin = data.data;

        const trips = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/Admin/Trip/GetAll`);
        const tripData = trips.data.data;
        console.log(tripData);
        
        setEarnings(admin.earning || 0);
        setTotalTrips(tripData.length || 0);
      } catch (err) {
        console.error("Error fetching earnings:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);


  const lineChartData = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        label: 'Monthly Earnings',
        data: [20000, 25000, 30000, 28000, 32000, 35000],
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
        label: 'Trips Completed',
        data: [35, 42, 38, 50, 45, 55, 48],
        backgroundColor: '#00a73e',
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
        <Card icon={<FaRupeeSign />} title="Total Earnings" value={`₹${earnings.toLocaleString()}`} sub="This Month" />
        <Card icon={<FaTasks />} title="Total Trips" value={totalTrips} sub="Completed" />
        <Card icon={<FaUsers />} title="Total Users" value={totalUsers} sub="Active Clients" />
        <Card icon={<FaProjectDiagram />} title="Projects" value={totalProjects} sub="Ongoing" />
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
