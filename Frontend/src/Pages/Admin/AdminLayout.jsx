import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // You can use any icon library

const navItems = [
  { name: 'Dashboard', path: '/Admin' },
  { name: 'Trips', path: '/Admin/Trips' },
  { name: 'Vehicles', path: '/Admin/Vehicles' },
  { name: 'Workers', path: '/Admin/Workers' },
  
  { name: 'Users', path: '/Admin/Users' },

];

export default function AdminLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavLinks = () => (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`block px-4 py-2 rounded-lg font-medium transition 
              ${location.pathname === item.path
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
            onClick={() => setMobileOpen(false)} // Close on click (mobile)
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
        <div className="text-xl font-bold text-blue-600">EzShift Admin</div>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-4">
          {renderNavLinks()}
          <button
            className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
            onClick={() => {
              window.location.href = '/Client/Login';
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg py-8 px-6">
        <div className="mb-10 text-2xl font-bold text-blue-600 tracking-wide">
          EzShift Admin
        </div>
        <nav>{renderNavLinks()}</nav>
        <div className="mt-auto pt-8 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} EzShift Admin
        </div>
        <button
          className="w-full mt-6 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
          onClick={() => {
            window.location.href = '/Worker/Auth';
            localStorage.removeItem('adminIsLogin'); // Clear admin login state 
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
