import React from 'react'
import clientDashboardImage from '../../../assets/clientDashboardImage.jpg';

export default function ClientDashboardMain() {
  return (
 
  <div className="p-10 md:p-25 flex justify-center">
        <div className=" w-full flex flex-col lg:flex-row gap-8 items-center">
          <div>
            <img className="rounded-lg md:w-full" src={clientDashboardImage} alt="Dashboard" />
          </div>
          <div className="p-5 md:p-25 flex flex-col justify-center gap-6">
            <h1 className="text-[#121516] text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Welcome to EzShift
            </h1>
            <h2 className="text-[#121516] text-base lg:text-lg font-normal">
              Your Seamless House Shifting Solution
            </h2>
            <button className="h-10 lg:h-12 px-4 lg:px-5 bg-[#b2d4e5] text-[#121516] text-sm lg:text-base font-bold rounded-full">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
  )
}
