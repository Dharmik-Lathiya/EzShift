import React, { useState } from "react";
import logo from "../../assets/logo.png";
import profilepicture from "../../assets/profilepicture.avif";
import { Link } from "react-router";

export default function ClientHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  if (menuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <nav>
      <div className="h-20 w-full bg-slate-900 flex justify-between items-center px-4 sm:px-6 z-50">
        <div className="flex items-center space-x-8">
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <img
            className="h-10 w-auto lg:h-14 cursor-pointer"
            src={logo}
            alt="Logo"
          />
        </div>
        <div className="md:block hidden mx-auto">
          <ul className="flex justify-between text-md lg:text-lg">
            <li className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
              <Link to="Dashboard">Home</Link>
            </li>
            <li className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
              <Link to="BookTrip">Book Trip</Link>
            </li>
            <li className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
              <Link to="Map">Map</Link>
            </li>
            <li className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
              <Link to="History">History</Link>
            </li>
          </ul>
        </div>
        <div className="h-11 w-11">
          <a href="Profile"><img className="rounded-full" src={profilepicture} alt="" /></a>
        </div>
      </div>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-6000 h-[100dvh] bg-black/30 w-60 "
        >
          <div
            className={`fixed top-20 left-0 h-full inset-0 p-10 pl-15 pr-15 rounded-r-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <ul className="z-6000 flex flex-col space-y-5 text-white text-lg">
              <li className="cursor-pointer hover:text-yellow-600 transition">
                <Link to="Dashboard">Home</Link>
              </li>
              <li className="cursor-pointer hover:text-yellow-600 transition">
                <Link to="BookTrip">Book Trip</Link>
              </li>
              <li className="cursor-pointer hover:text-yellow-600 transition">
                <Link to="Map">Map</Link>
              </li>
              <li className="cursor-pointer hover:text-yellow-600 transition">
                <Link to="History">History</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
