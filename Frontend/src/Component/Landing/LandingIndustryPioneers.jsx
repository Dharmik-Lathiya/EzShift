import React from "react";

export default function LandingIndustryPioneers() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Operations Manager",
      company: "RetailTech",
      quote: "Since switching to EzShift, our delivery disputes have dropped to zero. The real-time tracking is exactly what we needed to keep our customers informed.",
    },
    {
      name: "Michael Chen",
      role: "Facility Director",
      company: "Urban Workspaces",
      quote: "We move office equipment weekly. EzShift provides reliable trucks and professional labor that treats our hardware with care. Highly recommended.",
    },
    {
      name: "Elena Rodriguez",
      role: "Logistics Coordinator",
      company: "Fresh Foods Inc",
      quote: "The straightforward pricing model makes budgeting simple. We know exactly what a route will cost before booking, with no surprise charges.",
    }
  ];

  return (
    <section className="bg-white py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight text-center mb-16">
          Trusted by growing businesses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="flex flex-col bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex gap-1 text-yellow-400 mb-6 text-sm">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-gray-700 leading-relaxed mb-8 flex-grow">
                "{item.quote}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.role}, {item.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
