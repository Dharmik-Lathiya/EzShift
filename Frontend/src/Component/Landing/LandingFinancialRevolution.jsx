import React from "react";

export default function LandingFinancialRevolution() {
  return (
    <section className="relative min-h-screen w-full bg-slate-600 text-white bg-no-repeat bg-cover bg-center bg-[url('/img/rotate.jpg')] sm:bg-[url('/img/dark-gradient-background-with-copy-space_53876-99548.avif')]">
      <div className="items-center flex flex-col text-center relative p-4">
        <div className="mt-5">
          <p className="border-white border-1 rounded-full p-2 bg-white/10 backdrop-blur-lg text-white">
            <span>
              <i className="fa-solid fa-bolt text-white"></i>
            </span>
            high level technology used
          </p>
        </div>

        <div className="mt-7 mb-7">
          <h1 className="md:text-8xl md:font-medium sm:text-6xl font-medium text-5xl bg-gradient-to-r from-cyan-200 to-indigo-500 bg-clip-text text-transparent">
            Join the Financial
          </h1>
          <h1 className="md:text-8xl md:font-medium sm:text-6xl font-medium  text-5xl bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Revolution
          </h1>
        </div>

        <div className="mb-7">
          <p className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            maxime recusandae laborum quam deserunt sint dolorum ipsam
            doloremque, ut, debitis obcaecati ea beatae quod aut at culpa? Illum
            voluptates iusto nisi minus expedita, rem repudiandae repellendus
            laudantium blanditiis quis odit!
          </p>
        </div>

        <div className="mb-7">
          <button className="bg-gradient-to-r from-pink-500 to-indigo-700 px-3 py-2 text-lg rounded-lg  m-1 md:m-3">
            start your transaction
          </button>
          <button className="px-3 py-2 text-lg text-black bg-white rounded-lg  m-1 md:m-3">
            find the reciept
          </button>
        </div>
        <div className="flex flex-col gap-5 md:flex-row mt-10">
          <div className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 pl-6 pr-6">
            <p className="mt-3 text-2xl">24/7</p>
            <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 pl-6 pr-6">
            <p className="mt-3 text-2xl">14 days</p>
            <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="bg-black/30 backdrop-blur-lg md:py-7 md:px-20 rounded-lg shadow-[3px_6px_17px_-9px_rgba(236,_72,_153,_0.5)] pt-5 pb-5 pl-6 pr-6">
            <p className="mt-3 text-2xl">Zero</p>
            <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
