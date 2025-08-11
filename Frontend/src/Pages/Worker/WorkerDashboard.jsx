import React, { useEffect, useState } from 'react';
import { FaCalendarDay, FaTasks, FaRupeeSign, FaChartLine, FaDollarSign, FaProjectDiagram } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

export default function WorkerDashboard() {
  // Placeholder: Replace with actual worker ID from auth/session
  const workerId = 'WORKER_ID_PLACEHOLDER';

  const [stats, setStats] = useState({
    assignedTrips: 0,
    completedTrips: 0,
    earningsToday: 0,
    spendMonth: 0,
    totalProjects: 0,
    sales: 0,
    lineChart: [],
    barChart: [],
    shift: '',
    location: '',
    status: 'Available',
    name: 'Worker',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Placeholder: Replace with real API call
        const res = await fetch(`/api/worker/dashboard?workerId=${workerId}`);
        const data = await res.json();
        setStats({
          assignedTrips: data.assignedTrips || 0,
          completedTrips: data.completedTrips || 0,
          earningsToday: data.earningsToday || 0,
          spendMonth: data.spendMonth || 0,
          totalProjects: data.totalProjects || 0,
          sales: data.sales || 0,
          lineChart: data.lineChart || [],
          barChart: data.barChart || [],
          shift: data.shift || '10:00 AM - 6:00 PM',
          location: data.location || 'Sector 21, Mumbai',
          status: data.status || 'Available',
          name: data.name || 'Worker',
        });
      } catch (err) {
        // fallback to defaults
      }
      setLoading(false);
    };
    fetchStats();
  }, [workerId]);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-cyan-800">Welcome, {stats.name}</h1>
        <span className="text-gray-600">Status: <span className="text-green-600 font-semibold">{stats.status}</span></span>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card icon={<FaCalendarDay />} title="Today's Shift" value={stats.shift} sub={stats.location} />
        <Card icon={<FaTasks />} title="Assigned Tasks" value={stats.assignedTrips} sub="Pickup, Drop, Confirm" />
        <Card icon={<FaRupeeSign />} title="Earnings" value={`₹${stats.earningsToday}`} sub="Today" />
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
