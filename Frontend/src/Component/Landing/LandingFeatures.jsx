import React from "react";
import { motion } from "framer-motion";

export default function LandingFeatures() {
  // Variants for fade-up effect
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="Features-Section" className="relative w-full text-center bg-white py-20">
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p className="bg-gradient-to-tl from-red-400 to-red-600 bg-clip-text text-transparent font-extrabold text-3xl md:text-5xl mb-2">
            Features From The
          </p>
          <p className="bg-gradient-to-tl from-red-400 to-red-600 bg-clip-text text-transparent font-extrabold text-3xl md:text-5xl mb-6">
            Future
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            EzShift is designed with tomorrow in mind — smart technology,
            reliable operations, and features that redefine how shifting and
            logistics should work.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "fa-location-dot",
              title: "Real-Time Tracking",
              desc: "Track your shipments live with GPS-enabled precision and instant notifications.",
            },
            {
              icon: "fa-bolt",
              title: "Lightning-Fast Delivery",
              desc: "Optimized routes and AI-driven logistics ensure on-time delivery, every time.",
            },
            {
              icon: "fa-lock",
              title: "Secure Transactions",
              desc: "Multiple layers of security with end-to-end encryption for safe payments.",
            },
            {
              icon: "fa-leaf",
              title: "Eco-Friendly Vehicles",
              desc: "A sustainable fleet designed to reduce emissions and protect the environment.",
            },
            {
              icon: "fa-headset",
              title: "24/7 Customer Support",
              desc: "Always available to assist with real-time solutions and personalized help.",
            },
            {
              icon: "fa-chart-line",
              title: "Data-Driven Insights",
              desc: "Advanced analytics that empower smarter business decisions and growth.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-gray-200 p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.15 },
                },
              }}
            >
              <span className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-500 to-red-700 rounded-lg text-white text-2xl hover:rotate-12 transition-transform duration-300">
                <i className={`fa-solid ${feature.icon}`}></i>
              </span>
              <h3 className="mt-5 text-xl font-semibold text-red-500">
                {feature.title}
              </h3>
              <p className="text-gray-700 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
