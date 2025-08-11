import React from 'react';
import logo from '../../Assets/logo.png';
import { Outlet } from 'react-router';

export default function WorkerSetup() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="h-20 flex items-center justify-between px-6 border-b shadow">
        <img src={logo} alt="Logo" className="h-14 w-auto" />
        <h1 className="text-2xl md:text-3xl font-semibold">Create Profile</h1>
      </nav>

      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-red-200 w-full h-24 flex items-center justify-center border-t">
        <p className="text-lg font-medium text-gray-800">© 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
