import React from "react";

export default function LandingFinancialRevolution() {
  return (
    <section className="relative min-h-screen w-full bg-white text-gray-900 bg-no-repeat bg-cover bg-center bg-[url('/img/rotate.jpg')] sm:bg-[url('/img/dark-gradient-background-with-copy-space_53876-99548.avif')]">
      <div className="flex flex-col items-center text-center relative px-6 py-12 max-w-6xl mx-auto">
        
        {/* Badge */}
        <div className="mt-5">
          <p className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm text-sm font-medium text-gray-700">
            <i className="fa-solid fa-bolt text-yellow-500"></i>
            High-level technology used
          </p>
        </div>

        {/* Title */}
        <div className="mt-10 mb-8">
          <h1 className="md:text-7xl sm:text-6xl text-4xl font-extrabold bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">
            Join the Financial
          </h1>
          <h1 className="md:text-7xl sm:text-6xl text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-indigo-700 bg-clip-text text-transparent mt-2">
            Revolution
          </h1>
        </div>

        {/* Description */}
        <div className="mb-8 max-w-3xl">
          <p className="text-gray-600 leading-relaxed">
            Experience the next generation of secure, fast, and reliable
            financial transactions. With innovative technology and 
            transparent operations, we empower you to manage your 
            money like never before.
          </p>
        </div>

        {/* Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <button className="bg-gradient-to-r from-pink-500 to-indigo-700 px-6 py-3 text-lg font-semibold text-white rounded-lg shadow hover:opacity-90 transition">
            Start your transaction
          </button>
          <button className="px-6 py-3 text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition">
            Find the receipt
          </button>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <p className="text-3xl font-bold text-indigo-600">24/7</p>
            <p className="mt-2 text-gray-600">Reliable support anytime, anywhere.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <p className="text-3xl font-bold text-indigo-600">14 Days</p>
            <p className="mt-2 text-gray-600">Easy refunds and secure settlements.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <p className="text-3xl font-bold text-indigo-600">Zero</p>
            <p className="mt-2 text-gray-600">Hidden fees — complete transparency.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
