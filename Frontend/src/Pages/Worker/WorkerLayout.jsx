import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', path: '/Worker', icon: 'fa-chart-pie' },
  { name: 'Trips', path: '/Worker/Trips', icon: 'fa-route' },
  { name: 'Vehicle', path: '/Worker/Vehicle', icon: 'fa-truck' },
  { name: 'Profile', path: '/Worker/Profile', icon: 'fa-user' },
];

export default function WorkerLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavLinks = () => (
    <ul className="space-y-1">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors
              ${location.pathname === item.path
                ? 'bg-primary-light text-primary'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            onClick={() => setMobileOpen(false)} // Close menu on mobile
          >
            <i className={`fa-solid ${item.icon} w-5 text-center ${location.pathname === item.path ? 'text-primary' : 'text-gray-400'}`}></i>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden font-sans">

      {/* Top Navbar for Mobile */}
      <div className="md:hidden bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
            <i className="fa-solid fa-truck-fast text-sm"></i>
          </span>
          <div className="text-xl font-bold text-gray-900 tracking-tight">EzShift</div>
        </div>
        <button className="text-gray-600 p-1" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-4 absolute w-full z-50 shadow-lg">
          {renderNavLinks()}
          <div className="pt-4 border-t border-gray-100">
            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
              onClick={() => {
                window.location.href = '/Worker/Auth';
                localStorage.setItem('workerId', '');
                localStorage.setItem('workerIsLogin', '');
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i>
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
              <i className="fa-solid fa-truck-fast text-sm"></i>
            </span>
            <div className="text-xl font-bold text-gray-900 tracking-tight">EzShift <span className="text-gray-400 font-normal text-sm ml-1">Worker</span></div>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 flex flex-col">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Menu</div>
          <nav className="flex-1">{renderNavLinks()}</nav>
          
          <div className="mt-auto pt-6 border-t border-gray-100">
            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
              onClick={() => {
                window.location.href = '/Worker/Auth';
                localStorage.setItem('workerId', '');
                localStorage.setItem('workerIsLogin', '');
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center text-gray-400"></i>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto w-full relative">
        <main className="p-6 md:p-10 w-full max-w-7xl mx-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
