import React from 'react'

export default function LandingPerformance() {
  return (
    <section className="relative w-full bg-gradient-to-tl bg-slate-600 bg-cover bg-center bg-[url('/img/performance-2-rotate.jpg')] md:bg-[url('/img/performance-2.avif')]">
        <div className="text-center pt-15 pl-2.5 pr-2.5 md:pl-5 md:pr-5 md:pb-20 pb-15">
            <div className="">
                <p className="bg-gradient-to-tl from-pink-800 to-indigo-700 bg-clip-text text-transparent font-semibold 
                md:text-5xl  text-3xl mb-2 md:mb-5">
                Performance That Speaks</p>
                <p className="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, in.</p>
                
            </div>
            <div className="flex flex-col gap-5 md:flex-row mt-10 md:grid grid-cols-[auto_auto] pl-4 pr-4">
                <div
                    className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg hover:shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 text-white pl-3 pr-3">
                    <span className="text-cyan-300 text-5xl sm:text-4xl"><i
                            className="fa-solid fa-arrow-up-right-dots"></i></span>
                    <p className="mt-3 text-2xl">5109+</p>
                    <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div>
                <div
                    className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg sm:py-2 sm:px-7 hover:shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 text-white pl-3 pr-3">
                    <span className="text-cyan-300 text-5xl sm:text-4xl"><i className="fa-brands fa-slack"></i></span>
                    <p className="mt-3 text-2xl">100m+</p>
                    <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div>
                <div
                    className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg hover:shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 text-white pl-3 pr-3">
                    <span className="text-cyan-300 text-5xl sm:text-4xl"><i className="fa-solid fa-bolt"></i></span>
                    <p className="mt-3 text-2xl">99.99%</p>
                    <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div> 
                <div
                    className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg hover:shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 text-white pl-3 pr-3">
                    <span className="text-cyan-300 text-5xl sm:text-4xl"><i className="fa-solid fa-bolt"></i></span>
                    <p className="mt-3 text-2xl">99.99%</p>
                    <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
                </div> 
            </div>
        </div>
    </section>
  )
}
