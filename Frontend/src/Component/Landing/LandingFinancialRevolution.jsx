import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function LandingFinancialRevolution() {
  const points = [
    "Live tracking on every trip",
    "Upfront distance-based pricing",
    "Verified trucks & drivers",
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-sky-700 py-20 md:py-28 overflow-hidden">
      {/* Subtle texture + glow so the band isn't flat */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] bg-[length:36px_36px] opacity-40 pointer-events-none"></div>
      <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-sky-900/30 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-5">
          Moving day, minus the headaches.
        </h2>
        <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Book a truck in minutes, see the price before you confirm, and follow
          every step of your trip with live tracking. No surprises — just your
          stuff, moved from door to door.
        </p>

        <ul className="flex flex-wrap justify-center gap-2.5 mb-10">
          {points.map((point) => (
            <li
              key={point}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-sm text-white/90"
            >
              <CheckCircle2 size={15} className="text-white" />
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/Client/Auth"
            className="inline-flex items-center justify-center bg-white text-primary px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/ContectUs"
            className="inline-flex items-center justify-center bg-transparent text-white border border-white/30 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <p className="text-blue-100/80 text-sm mt-6">
          Get an instant distance-based quote before you book.
        </p>
      </div>
    </section>
  );
}