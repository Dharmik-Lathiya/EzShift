import React from 'react';

export default function ClientDashboardHeader() {
  return (
    <>
      {/* Hero Section */}
    

      {/* Why Choose Section */}
      <div className="flex flex-col items-center gap-10 px-10 py-10">
        <div className="max-w-[720px] w-full">
          <h1 className="text-[#121516] text-3xl lg:text-4xl font-bold mb-4">
            Why Choose EzShift?
          </h1>
          <p className="text-[#121516] text-base font-normal">
            We provide a comprehensive house shifting service, taking care of every detail from packing to unpacking, so you can focus on settling into your new home.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[960px]">
          {/* Feature 1 */}
          <div className="p-4 border border-[#dde1e3] rounded-lg bg-white flex flex-col gap-3">
            <div className="text-2xl">🚚</div>
            <div>
              <h2 className="text-[#121516] text-base font-bold">Reliable Transportation</h2>
              <p className="text-[#6a7981] text-sm">
                Our fleet of well-maintained vehicles ensures your belongings are transported safely and securely.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-4 border border-[#dde1e3] rounded-lg bg-white flex flex-col gap-3">
            <div className="text-2xl">📦</div>
            <div>
              <h2 className="text-[#121516] text-base font-bold">Secure Packing</h2>
              <p className="text-[#6a7981] text-sm">
                We use high-quality packing materials to protect your items during the move.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="p-4 border border-[#dde1e3] rounded-lg bg-white flex flex-col gap-3">
            <div className="text-2xl">📦</div>
            <div>
              <h2 className="text-[#121516] text-base font-bold">Secure Packing</h2>
              <p className="text-[#6a7981] text-sm">
                We use high-quality packing materials to protect your items during the move.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-4 border border-[#dde1e3] rounded-lg bg-white flex flex-col gap-3">
            <div className="text-2xl">⏱️</div>
            <div>
              <h2 className="text-[#121516] text-base font-bold">Timely Delivery</h2>
              <p className="text-[#6a7981] text-sm">
                We ensure timely delivery so you can settle into your new home without delays.
              </p>
            </div>
          </div>
        </div>
      </div>

      

      {/* Footer */}
      <footer className="flex justify-center bg-white border-t">
        <div className="max-w-[960px] w-full flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#6a7981]">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <p className="text-[#6a7981] text-sm">© 2023 EzShift. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
