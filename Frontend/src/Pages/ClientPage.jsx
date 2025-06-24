import React from 'react';
import { Outlet } from "react-router";

export default function ClientPage() {
  return (
    <div className="flex">
      <aside className="w-52 max-h-full bg-gray-700 text-gray-950 p-4 shadow-md">
        <label className="font-semibold text-lg">Hello, Client</label>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
