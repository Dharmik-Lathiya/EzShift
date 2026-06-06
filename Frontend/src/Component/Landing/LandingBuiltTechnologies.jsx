import React from "react";

export default function LandingBuiltTechnologies() {
  return (
    <section className="bg-gray-50 py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-6">
              A smarter way to manage logistics
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              EzShift integrates seamlessly into your workflow. Our platform is built on modern architecture that prioritizes speed, reliability, and ease of use. Book a truck, assign workers, and track your move all from a single dashboard.
            </p>
            
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check text-sm text-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Instant Quotes</h4>
                  <p className="text-gray-600">Get accurate pricing immediately based on real-time availability and route data.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check text-sm text-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Worker Assignment</h4>
                  <p className="text-gray-600">Need help loading? Easily add verified professional workers to your booking.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check text-sm text-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Digital Receipts</h4>
                  <p className="text-gray-600">All your invoices and trip histories are saved securely in your account.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 h-full min-h-[400px] flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
             <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Trip ID</p>
                    <p className="font-semibold text-gray-900">#EZ-84920</p>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">In Transit</div>
                </div>
                
                <div className="relative pl-6 space-y-8">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                  
                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                    <p className="text-sm text-gray-500 font-medium">Pickup</p>
                    <p className="font-semibold text-gray-900">123 Business Park, Sector 4</p>
                    <p className="text-sm text-gray-500">10:00 AM</p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 bg-primary rounded-full border-2 border-white"></div>
                    <p className="text-sm text-primary font-medium">Current Location</p>
                    <p className="font-semibold text-gray-900">Highway 8, near toll plaza</p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 bg-gray-200 rounded-full border-2 border-white"></div>
                    <p className="text-sm text-gray-500 font-medium">Dropoff</p>
                    <p className="font-semibold text-gray-900">789 Industrial Estate</p>
                    <p className="text-sm text-gray-500">Est. 2:30 PM</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
