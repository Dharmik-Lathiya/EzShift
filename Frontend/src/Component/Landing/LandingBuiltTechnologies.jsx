import React from "react";
import { motion } from "framer-motion";

export default function LandingBuiltTechnologies() {
  return (
    <section className="text-center bg-white text-black">
      <div>
        {/* Heading */}
        <div className="pt-10">
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-tl from-pink-800 to-indigo-700 bg-clip-text text-transparent font-semibold 
              md:text-5xl text-3xl mb-2 md:mb-5"
          >
            Performance That Speaks
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente,
            in.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 text-white p-5 pt-10 gap-8 text-left md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 pl-10 pr-10 md:pb-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: i * 0.25, // sequential animation
                duration: 0.8, // slower, smoother
                ease: "easeOut",
              }}
              className="rounded-xl shadow-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 p-6 hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300"
            >
              {/* Icon + Title */}
              <div className="flex">
                <span className="inline-block w-14 h-14 mt-1.5 bg-black/20 backdrop-blur-lg p-3 text-center rounded-md">
                  <i className="fa-solid fa-earth-americas text-sky-300 text-3xl"></i>
                </span>
                <div>
                  <p className="ml-4 text-lg font-semibold">Lorem ipsum dolor sit.</p>
                  <p className="text-gray-200 ml-4 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus
                  </p>
                </div>
              </div>

              {/* List */}
              <div>
                <ul className="list-disc pl-6 text-sm text-gray-100 leading-6 md:mt-5">
                  <li>Lorem, ipsum.</li>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum. that</li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
