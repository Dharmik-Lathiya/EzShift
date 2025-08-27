import React from 'react';
import logo from '../../assets/logo.png';
import { Outlet } from 'react-router';

export default function WorkerSetup() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="h-20 flex bg-slate-900 items-center justify-between px-6 border-b shadow">
        <img src={logo} alt="Logo" className="h-14 w-auto" />
        <h1 className="text-2xl md:text-3xl text-white font-semibold">Create Profile</h1>
      </nav>

      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-white px-6 py-12 md:px-12">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-700 rounded-md text-2xl">
              <i className="fa-solid fa-truck"></i>
            </span>
            <p className="bg-gradient-to-r from-pink-600 to-sky-400 bg-clip-text text-transparent text-3xl font-bold">
              EzShift
            </p>
          </div>
          <p className="text-gray-400 leading-6">
            EzShift makes shifting easier! From mini-trucks to container trucks, 
            with professional workers and real-time tracking — we handle your 
            move with care, speed, and affordability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-xl mb-4 font-semibold">Quick Links</h5>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-sky-400">Home</a></li>
            <li><a href="/about" className="hover:text-sky-400">About Us</a></li>
            <li><a href="/services" className="hover:text-sky-400">Our Services</a></li>
            <li><a href="/pricing" className="hover:text-sky-400">Pricing</a></li>
            <li><a href="/contact" className="hover:text-sky-400">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h5 className="text-xl mb-4 font-semibold">Our Services</h5>
          <ul className="space-y-2 text-gray-400">
            <li>Household Shifting</li>
            <li>Office Relocation</li>
            <li>Vehicle Transport</li>
            <li>Workers for Loading/Unloading</li>
            <li>Real-time Tracking</li>
            <li>Affordable Packages</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-xl mb-4 font-semibold">Get In Touch</h5>
          <p className="text-gray-400 mb-3">
            Have questions? Reach out to us anytime!
          </p>
          <p className="text-gray-400"><i className="fa-solid fa-phone mr-2"></i> +91 98765 43210</p>
          <p className="text-gray-400"><i className="fa-solid fa-envelope mr-2"></i> support@ezshift.com</p>
          <p className="text-gray-400"><i className="fa-solid fa-location-dot mr-2"></i> Ahmedabad, India</p>
          <div className="flex gap-4 mt-4 text-xl">
            <a href="#"><i className="fa-brands fa-facebook hover:text-sky-400"></i></a>
            <a href="#"><i className="fa-brands fa-instagram hover:text-sky-400"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin hover:text-sky-400"></i></a>
            <a href="#"><i className="fa-brands fa-twitter hover:text-sky-400"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400 text-sm">
        <p>Made with <i className="fa-solid fa-heart text-red-500"></i> by EzShift Team</p>
        <p>© {new Date().getFullYear()} EzShift. All Rights Reserved.</p>
      </div>
    </footer>
    </div>
  );
}
