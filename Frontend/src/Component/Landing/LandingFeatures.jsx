import React from "react";

export default function LandingFeatures() {
  const features = [
    {
      icon: "fa-location-dot",
      title: "Real-Time Tracking",
      desc: "Monitor your shipment from pickup to delivery with accurate, live location updates.",
    },
    {
      icon: "fa-truck-fast",
      title: "Efficient Fleet",
      desc: "Our diverse range of vehicles ensures we have the right truck for your specific load.",
    },
    {
      icon: "fa-shield-halved",
      title: "Secure Handling",
      desc: "Professional workers trained to handle your goods safely, from fragile items to heavy furniture.",
    },
    {
      icon: "fa-file-invoice-dollar",
      title: "Transparent Pricing",
      desc: "No hidden fees. You get clear, upfront pricing based on distance and load size.",
    },
    {
      icon: "fa-headset",
      title: "Dedicated Support",
      desc: "Our team is available around the clock to assist you with any questions or concerns.",
    },
    {
      icon: "fa-clock",
      title: "On-Time Guarantee",
      desc: "We respect your schedule. Our routing technology minimizes delays and ensures timely arrivals.",
    },
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:flex md:justify-between md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">Everything you need for a smooth move</h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide end-to-end logistics solutions designed to take the stress out of shifting. Whether it's a small apartment or a large office, we've got you covered.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6">
                <i className={`fa-solid ${feature.icon} text-lg text-gray-700`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
