import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from "framer-motion";

export default function LandingMain() {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 90]);   
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section
        className="relative min-h-screen w-full text-white bg-gradient-to-br from-black via-red-900 to-black bg-no-repeat bg-cover bg-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #000000 0%, #1a0000 25%, #330000 50%, #1a0000 75%, #000000 100%)`,
          opacity: scrollOpacity,
          transition: 'opacity 0.1s ease-out'
        }}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-red-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-red-300 rounded-full animate-ping opacity-40"></div>
          <div className="absolute top-60 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-bounce opacity-50"></div>
          <div className="absolute top-80 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-96 left-1/2 w-1 h-1 bg-red-300 rounded-full animate-ping opacity-30"></div>
          
          {/* Gradient orbs */}
          <div className="absolute top-32 left-1/3 w-32 h-32 bg-gradient-to-r from-red-600/20 to-transparent rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-64 right-1/4 w-24 h-24 bg-gradient-to-l from-red-500/15 to-transparent rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-red-700/10 to-transparent rounded-full blur-2xl animate-pulse"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:50px_50px] opacity-30"></div>
          
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40"></div>
          
          {/* Animated lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-pulse"></div>
          <div className="absolute top-3/4 right-0 w-px h-32 bg-gradient-to-b from-transparent via-red-400/20 to-transparent animate-pulse"></div>
          
          {/* Glowing corners */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-600/10 to-transparent rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-600/10 to-transparent rounded-tl-full"></div>
        </div>

        <div className="items-center flex flex-col text-center relative p-4 z-10">
            <div className="mt-5">
                <p className="border-white border-1 rounded-full p-2 bg-white/10 backdrop-blur-lg"><span><i
                            className="fa-solid fa-bolt"></i></span> high level technology used</p>
            </div>

            <div className="mt-7 mb-7">
                <h1
                    className="md:text-8xl md:font-medium sm:text-6xl font-medium text-5xl bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
                    The future of</h1>
                <h1
                    className="md:text-8xl md:font-medium sm:text-6xl font-medium  text-5xl bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    home transport</h1>
            </div>

            <div className="mb-7">
                <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis maxime recusandae laborum quam
                    deserunt sint dolorum ipsam doloremque, ut, debitis obcaecati ea beatae quod aut at culpa? Illum
                    voluptates iusto nisi minus expedita, rem repudiandae repellendus laudantium blanditiis quis odit!
                </p>
            </div>

            <div className="mb-7 ">
                <button className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 px-6 py-3 text-lg rounded-xl m-1 md:m-3 hover:from-red-700 hover:via-red-800 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:scale-105 border border-red-500/30 backdrop-blur-sm">start your
                    journey</button>
                <button className="px-6 py-3 text-lg text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl m-1 md:m-3 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-gray-500/25 transform hover:scale-105 border border-gray-600/30 backdrop-blur-sm">find the vehicle</button>
            </div>
            {/* <div className="flex flex-col gap-5 md:flex-row mt-10">
                <div
                    className="bg-gradient-to-br from-black/70 via-gray-800/30 to-black/70 backdrop-blur-xl md:py-7 md:px-20 rounded-2xl shadow-[0_8px_32px_rgba(0,_0,_0,_0.4)] pt-5 pb-5 pl-6 pr-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,_0,_0,_0.6)]">
                    <span className="text-cyan-400 text-5xl sm:text-4xl drop-shadow-lg"><i
                            className="fa-solid fa-arrow-up-right-dots"></i></span>
                    <p className="mt-3 text-2xl font-bold text-white">5109+</p>
                    <p className="text-gray-300">Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div>
                <div
                    className="bg-gradient-to-br from-black/70 via-gray-800/30 to-black/70 backdrop-blur-xl md:py-7 md:px-20 rounded-2xl shadow-[0_8px_32px_rgba(0,_0,_0,_0.4)] pt-5 pb-5 pl-6 pr-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,_0,_0,_0.6)]">
                    <span className="text-cyan-400 text-5xl sm:text-4xl drop-shadow-lg"><i className="fa-brands fa-slack"></i></span>
                    <p className="mt-3 text-2xl font-bold text-white">100m+</p>
                    <p className="text-gray-300">Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div>
                <div
                    className="bg-gradient-to-br from-black/70 via-gray-800/30 to-black/70 backdrop-blur-xl md:py-7 md:px-20 rounded-2xl shadow-[0_8px_32px_rgba(0,_0,_0,_0.4)] pt-5 pb-5 pl-6 pr-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,_0,_0,_0.6)]">
                    <span className="text-cyan-400 text-5xl sm:text-4xl drop-shadow-lg"><i className="fa-solid fa-bolt"></i></span>
                    <p className="mt-3 text-2xl font-bold text-white">99.99%</p>
                    <p className="text-gray-300">Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div>
            </div>*/}
        </div> 
        <div className="grid place-items-center -mt-20">
      <motion.img
        src="/new.png" 
        alt="Description of image"
        style={{ scale, rotateZ }}
        className="w-[700px] h-[700px]" // starting size
      />
    </div>
    </section>
  )
}
