import React from "react";

export default function LandingFinancialRevolution() {
  return (
    <section className="bg-primary py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
          Ready to streamline your next move?
        </h2>
        <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Create an account today to book vehicles, track shipments, and manage your logistics effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-primary px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Get Started
          </button>
          <button className="bg-transparent text-white border border-blue-300 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
