import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/Worker' },
  { name: 'Assigned Trips', path: '/Worker/Trips' },
  { name: 'Profile', path: '/Worker/Profile' },
];

export default function WorkerLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-6">
        <div className="mb-10 text-2xl font-bold text-green-600 tracking-wide">
          EzShift Worker
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded-lg font-medium transition 
                    ${location.pathname === item.path
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-600'}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-8 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} EzShift Worker
        </div>
        <button
          className="w-full mt-6 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
          onClick={() => {
            // Add your logout logic here
            window.location.href = '/Client/Login';
          }}
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
