import React from "react";

export default function LandingFooter() {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <i className="fa-solid fa-truck-fast text-primary text-xl"></i>
              <span className="text-xl font-bold text-gray-900 tracking-tight">EzShift</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-sm">
              Making shifting easier, faster, and more transparent. The modern platform for all your logistics needs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <i className="fa-brands fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <i className="fa-brands fa-linkedin text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <i className="fa-brands fa-github text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Tracking</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EzShift Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <i className="fa-solid fa-globe"></i> English (US)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
