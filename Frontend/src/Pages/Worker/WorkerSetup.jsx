import React from 'react';
import { Outlet } from 'react-router';

export default function WorkerSetup() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="h-16 flex bg-white items-center justify-between px-6 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-primary rounded-md text-white text-sm shadow-sm">
            <i className="fa-solid fa-truck-fast"></i>
          </span>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">EzShift</h1>
        </div>
        <div className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Worker Setup</div>
      </nav>

      <main className="flex-1 flex flex-col relative">
        <Outlet />
      </main>
    </div>
  );
}
