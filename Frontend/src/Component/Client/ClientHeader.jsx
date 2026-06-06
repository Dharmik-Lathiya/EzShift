import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react";

export default function ClientHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const location = useLocation();
  const clientId = localStorage.getItem("clientId");

  useEffect(() => {
    if (!clientId) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/Client/Profile/${clientId}`)
      .then((res) => {
        setAvatarUrl(res.data?.profilePic || "");
      })
      .catch(() => {
        setAvatarUrl("");
      });
  }, [clientId]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", path: "/Client/Dashboard" },
    { name: "Book Trip", path: "/Client/BookTrip" },
    { name: "Map", path: "/Client/Map" },
    { name: "History", path: "/Client/History" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 h-20">
        <div className="flex items-center gap-6">
          <button
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link to="/Client/Dashboard" className="flex items-center">
            <img
              className="h-10 lg:h-12 w-auto"
              src={'/logo.png'}
              alt="EzShift Logo"
            />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center justify-center flex-1 mx-8">
          <ul className="flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  className={`px-5 py-2.5 rounded-lg text-sm lg:text-base font-semibold transition-all duration-200 ${
                    location.pathname.includes(link.path)
                      ? "bg-primary-light text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/Client/Profile" className="block relative group">
            <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-primary transition-colors">
              <img
                className="h-full w-full object-cover"
                src={avatarUrl || '/favicon.png'}
                alt="profile"
                onError={(e) => {
                  e.currentTarget.src = '/favicon.png';
                }}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)}>
          <div 
            className="absolute top-0 left-0 h-full w-72 bg-white shadow-xl flex flex-col transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <img className="h-8 w-auto" src={'/logo.png'} alt="Logo" />
              <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-6 py-4 text-base font-semibold border-l-4 transition-colors ${
                      location.pathname.includes(link.path)
                        ? "border-primary bg-primary-light text-primary"
                        : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="mt-4 border-t border-gray-100 pt-4">
                 <Link 
                    to="/Client/Profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
