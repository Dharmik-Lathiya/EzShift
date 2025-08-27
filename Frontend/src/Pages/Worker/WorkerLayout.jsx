import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiSearch, FiBell, FiInfo, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', path: '/Worker' },
  { name: 'Trips', path: '/Worker/Trips' },
  { name: 'Vehicle', path: '/Worker/Vehicle' },
  { name: 'Profile', path: '/Worker/Profile' },
];

export default function WorkerLayout() {
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
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-600'}`}
            onClick={() => setMobileOpen(false)} // Close menu on mobile
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">

      {/* Top Navbar for Mobile */}
      <div className="md:hidden bg-white shadow flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold text-green-600">EzShift Worker</div>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          {renderNavLinks()}
          <button
            className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
            onClick={() => {
              window.location.href = '/Worker/Auth';
            localStorage.setItem('workerId', '');
            localStorage.setItem('workerIsLogin', '');
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg py-5 px-6">
        <div className="mb-10 text-2xl font-bold text-green-600 tracking-wide">
          EzShift Shifter
        </div>
        <nav>{renderNavLinks()}</nav>
        <div className="mt-auto pt-8 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} EzShift Shifter
        </div>
        <button
          className="w-full mt-6 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
          onClick={() => {
            window.location.href = '/Worker/Auth';
            localStorage.setItem('workerId', '');
            localStorage.setItem('workerIsLogin', '');
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Fixed Top Bar for Desktop */}
        {/* <nav className="hidden md:flex justify-between items-center px-6 py-4 shadow bg-white z-10">
          <div>
            <p className="text-sm text-gray-500">
              Pages / <span className="text-gray-700 capitalize">{location.pathname.split('/').pop()}</span>
            </p>
            <h1 className="text-2xl font-bold text-[#1d2746] capitalize">
              {location.pathname.split('/').pop()}
            </h1>
          </div>
          <div className="flex items-center space-x-4 bg-white rounded-full px-4 py-2 shadow">
            <div className="flex items-center space-x-2">
              <FiSearch className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm bg-transparent placeholder-gray-400"
              />
            </div>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <FiBell className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <FiInfo className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <FiMoon className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white text-sm font-bold">
              AP
            </div>
          </div>
        </nav> */}

        {/* Page Content */}
        <main className="p-5 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
