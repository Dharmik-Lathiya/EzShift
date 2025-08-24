import React from "react";

export default function LandingIndustryPioneers() {
  return (
    <section className="bg-white text-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="bg-gradient-to-tl from-pink-600 to-indigo-600 bg-clip-text text-transparent font-bold text-3xl md:text-5xl">
            Trusted by
          </p>
          <p className="bg-gradient-to-tl from-pink-600 to-indigo-600 bg-clip-text text-transparent font-bold text-3xl md:text-5xl">
            Industry Pioneers
          </p>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Leaders across industries trust us to deliver innovation and 
            excellence that drives real-world results.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition"
            >
              {/* Stars */}
              <div className="text-yellow-400 mb-4">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm mb-6">
                “Workify transformed the way we manage logistics. Their platform 
                is reliable, efficient, and a true game-changer for the industry.”
              </p>

              {/* Profile */}
              <div className="flex items-center">
                <div className="h-14 w-14 bg-gray-200 rounded-full mr-4 flex items-center justify-center text-gray-500">
                  <i className="fa-solid fa-user text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-indigo-600 font-medium">
                    Founder of Meta
                  </p>
                  <p className="text-xs text-gray-500">Global Innovator</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
