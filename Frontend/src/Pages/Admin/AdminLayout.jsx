import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import MobileBottomNav from '../../Component/MobileBottomNav';
import { LayoutDashboard, Route, Truck, Users, UserRound } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/Admin', icon: LayoutDashboard },
  { name: 'Trips', path: '/Admin/Trips', icon: Route },
  { name: 'Vehicles', path: '/Admin/Vehicles', icon: Truck },
  { name: 'Workers', path: '/Admin/Workers', icon: Users },
  { name: 'Users', path: '/Admin/Users', icon: UserRound },
];

const handleLogout = () => {
  localStorage.removeItem('adminIsLogin');
  window.location.href = '/Worker/Auth';
};

export default function AdminLayout() {
  const location = useLocation();

  const renderNavLinks = () => (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`block px-4 py-2 rounded-lg font-medium transition 
              ${location.pathname === item.path
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-primary-light hover:text-primary'}`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Navbar */}
      <header className="md:hidden flex justify-between items-center bg-white shadow px-4 py-3">
        <div className="text-xl font-bold text-primary">EzShift Admin</div>
      </header>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg py-8 px-6">
        <div className="mb-10 text-2xl font-bold text-primary tracking-wide">
          EzShift Admin
        </div>
        <nav>{renderNavLinks()}</nav>
        <div className="mt-auto pt-8 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} EzShift Admin
        </div>
        <button
          className="w-full mt-6 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile bottom navigation */}
      <MobileBottomNav items={navItems} onLogout={handleLogout} />
    </div>
  );
}