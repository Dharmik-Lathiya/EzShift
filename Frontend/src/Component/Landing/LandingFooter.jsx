import React from "react";

export default function LandingFooter() {
  return (
    <footer className="bg-slate-900 text-white p-3 pt-15">
      <div className="grid gap-5 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-20 md:pl-5 md:pr-5">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <span className="text-black inline-block w-12 h-12 md:h-17 md:w-17 md:p-3 bg-gradient-to-r from-rose-400 to-pink-800 rounded-md text-center p-2 text-xl md:text-4xl">
              <i className="fa-solid fa-bolt"></i>
            </span>
            <p className="bg-gradient-to-tl from-pink-800 to-indigo-700 bg-clip-text text-transparent text-4xl font-semibold">
              EzShift
            </p>
          </div>
          <p className="text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum vel,
            hic fuga illo minima corrupti reiciendis error, corporis distinctio
            numquam, omnis accusantium ex facere.
          </p>
        </div>
        <div>
          <h5 className="text-2xl mb-2 text-white pl-0">Lorem, ipsum.</h5>
          <div className="leading-5.5 text-sm text-gray-500 pl-5 md:pl-0">
            <p>Lorem, ipsum.</p>
            <p>Lorem, ipsum dolor.</p>
            <p>Lorem.</p>
            <p>Lorem, ipsum.</p>
            <p>Lorem, ipsum.</p>
            <p>Lorem, ipsum dolor.</p>
          </div>
        </div>
        <div>
          <h5 className="text-2xl mb-2 text-white pl-0">Lorem, ipsum.</h5>
          <div className="leading-5.5 text-sm text-gray-500 pl-5 md:pl-0">
            <p>Lorem, ipsum.</p>
            <p>Lorem, ipsum dolor.</p>
            <p>Lorem.</p>
            <p>Lorem, ipsum.</p>
            <p>Lorem, ipsum.</p>
            <p>Lorem, ipsum dolor.</p>
          </div>
        </div>
        <div>
          <h5 className="text-2xl mb-2 text-white">Lorem, ipsum.</h5>
          <div className=" text-sm text-gray-500 pl-5 md:pl-0"> 
            <p className="leading-5.5">
              Lorem, ipsum. Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, alias?
            </p>
            <div className="flex leading-5.5 items-center gap-5 md:gap-1 mt-2 mb-2">
              <p className="text-sky-400 text-lg">Lorem, ipsum dolor.</p>
              <button className="bg-gradient-to-r from-pink-500 to-indigo-700 text-white px-3 py-2 text-lg rounded-md m-1 md:m-3">download</button>
            </div>
            <p className="leading-5.5">Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 mb-5 w-full border-t-1 border-white">
        <p className="mt-5">Made with <i class="fa-solid fa-heart text-red-700"></i> by Easy Tutorials</p>
        <p> &copy; 2025 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}
