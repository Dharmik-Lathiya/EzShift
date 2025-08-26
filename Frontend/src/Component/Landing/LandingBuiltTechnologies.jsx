import React from "react";
import { motion } from "framer-motion";
import { FaTruckMoving, FaUserFriends, FaRoute, FaClipboardList } from "react-icons/fa";
import { FiBox, FiMapPin } from "react-icons/fi";

export default function EzShiftTools() {
  return (
    <section className="bg-white text-black py-16 px-6 md:px-12">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold mb-4"
        >
          Smart Tools, Designed to Power EzShift 🚚
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600"
        >
          From booking trucks to managing workers and tracking your shift, EzShift
          gives you everything you need for a smooth relocation experience.
        </motion.p>
      </div>

      {/* Two Big Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Card 1 - Operations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 bg-gradient-to-tr from-sky-200 via-sky-100 to-white shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-2">Shift Management</h3>
          <p className="text-gray-600 mb-6">
            Automate your shifting process with real-time updates. Assign vehicles,
            workers, and monitor trip progress with ease.
          </p>

          <p className="font-medium mb-4">Core tools:</p>
          <div className="flex gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4 w-20 h-20 flex items-center justify-center">
              <FaTruckMoving className="text-3xl text-sky-600" />
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 w-20 h-20 flex items-center justify-center">
              <FaUserFriends className="text-3xl text-sky-600" />
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 w-20 h-20 flex items-center justify-center">
              <FaClipboardList className="text-3xl text-sky-600" />
            </div>
          </div>

          <button className="w-full bg-white shadow-md rounded-lg py-3 font-medium hover:bg-gray-100 transition">
            Learn more about shift tools →
          </button>
        </motion.div>

        {/* Card 2 - Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl p-8 bg-gradient-to-tr from-purple-200 via-purple-100 to-white shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-2">Tracking & Logistics</h3>
          <p className="text-gray-600 mb-6">
            Stay updated with live tracking, optimized routes, and item safety. EzShift
            ensures reliability at every step of the journey.
          </p>

          <p className="font-medium mb-4">Tracking tools:</p>
          <div className="flex gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4 w-20 h-20 flex items-center justify-center">
              <FiMapPin className="text-3xl text-purple-600" />
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 w-20 h-20 flex items-center justify-center">
              <FaRoute className="text-3xl text-purple-600" />
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 w-20 h-20 flex items-center justify-center">
              <FiBox className="text-3xl text-purple-600" />
            </div>
          </div>

          <button className="w-full bg-white shadow-md rounded-lg py-3 font-medium hover:bg-gray-100 transition">
            Learn more about tracking →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
