import React from 'react'
import ClientHeader from '../../Component/Client/ClientHeader'
import { Outlet } from 'react-router-dom';
import LandingFooter from '../../Component/Landing/LandingFooter';
import MobileBottomNav from '../../Component/MobileBottomNav';
import { LayoutDashboard, Truck, Map, History, User } from 'lucide-react';

const clientNavItems = [
  { name: 'Home', path: '/Client/Dashboard', icon: LayoutDashboard },
  { name: 'Book Trip', path: '/Client/BookTrip', icon: Truck },
  { name: 'Map', path: '/Client/Map', icon: Map },
  { name: 'History', path: '/Client/History', icon: History },
  { name: 'Profile', path: '/Client/Profile', icon: User },
];

export default function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <ClientHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      <LandingFooter />
      <MobileBottomNav items={clientNavItems} />
    </div>
  )
}