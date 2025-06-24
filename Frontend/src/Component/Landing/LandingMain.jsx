import React from 'react'

export default function LandingMain() {
  return (
    <section
        className="relative min-h-screen w-full text-white bg-slate-900 bg-no-repeat bg-cover bg-center bg-[url('/img/rotate.jpg')] sm:bg-[url('/img/dark-gradient-background-with-copy-space_53876-99548.avif')]">

        <div className="items-center flex flex-col text-center relative p-4">
            <div className="mt-5">
                <p className="border-white border-1 rounded-full p-2 bg-white/10 backdrop-blur-lg"><span><i
                            className="fa-solid fa-bolt"></i></span> high level technology used</p>
            </div>

            <div className="mt-7 mb-7">
                <h1
                    className="md:text-8xl md:font-medium sm:text-6xl font-medium text-5xl bg-gradient-to-r from-cyan-200 to-indigo-500 bg-clip-text text-transparent">
                    The future of</h1>
                <h1
                    className="md:text-8xl md:font-medium sm:text-6xl font-medium  text-5xl bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                    home transport</h1>
            </div>

            <div className="mb-7">
                <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis maxime recusandae laborum quam
                    deserunt sint dolorum ipsam doloremque, ut, debitis obcaecati ea beatae quod aut at culpa? Illum
                    voluptates iusto nisi minus expedita, rem repudiandae repellendus laudantium blanditiis quis odit!
                </p>
            </div>

            <div className="mb-7 ">
                <button className="bg-gradient-to-r from-pink-500 to-indigo-700 px-3 py-2 text-lg rounded-lg m-1 md:m-3">start your
                    journey</button>
                <button className="px-3 py-2 text-lg text-black bg-white rounded-lg m-1 md:m-3">find the vehicle</button>
            </div>
            <div className="flex flex-col gap-5 md:flex-row mt-10">
                <div
                    className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 pl-6 pr-6">
                    <span className="text-cyan-300 text-5xl sm:text-4xl"><i
                            className="fa-solid fa-arrow-up-right-dots"></i></span>
                    <p className="mt-3 text-2xl">5109+</p>
                    <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div>
                <div
                    className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 pl-6 pr-6">
                    <span className="text-cyan-300 text-5xl sm:text-4xl"><i className="fa-brands fa-slack"></i></span>
                    <p className="mt-3 text-2xl">100m+</p>
                    <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div>
                <div
                    className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 pl-6 pr-6">
                    <span className="text-cyan-300 text-5xl sm:text-4xl"><i className="fa-solid fa-bolt"></i></span>
                    <p className="mt-3 text-2xl">99.99%</p>
                    <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>
    </section>
  )
}
