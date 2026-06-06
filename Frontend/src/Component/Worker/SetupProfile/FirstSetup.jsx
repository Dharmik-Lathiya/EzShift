import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FirstSetup() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/Worker/SetupProfile/City');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            Ready for your next big opportunity?
          </h1>
          <ul className="space-y-6 mb-10">
            <li className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0 mr-4 mt-1">
                <i className="fa-solid fa-user-check text-primary"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Build your profile</h3>
                <p className="text-gray-500 text-sm mt-1">Answer a few quick questions to get started</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0 mr-4 mt-1">
                <i className="fa-solid fa-briefcase text-primary"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Find work easily</h3>
                <p className="text-gray-500 text-sm mt-1">Get assigned to shifts matching your vehicle</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0 mr-4 mt-1">
                <i className="fa-solid fa-wallet text-primary"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get paid securely</h3>
                <p className="text-gray-500 text-sm mt-1">We handle the transactions securely and on time</p>
              </div>
            </li>
          </ul>
          <div>
            <button
              onClick={handleStartClick}
              className="bg-primary text-white font-semibold py-3.5 px-8 rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
            >
              Get started
            </button>
            <p className="text-sm text-gray-500 mt-4">
              It only takes a few minutes.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-gray-100 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full opacity-50"></div>
          
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-md mb-6 text-3xl text-gray-300 relative z-10">
            <i className="fa-solid fa-user"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1 relative z-10">
            Dharmik Lathiya
          </h2>
          <p className="text-primary mb-6 font-medium text-sm relative z-10">Professional Driver</p>
          
          <div className="flex gap-8 mb-8 border-t border-b border-gray-200 py-5 w-full justify-center relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                <i className="fa-solid fa-star text-yellow-400 text-sm"></i> 5.0
              </div>
              <div className="text-xs text-gray-500 font-medium tracking-wider mt-1">RATING</div>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-gray-900 font-bold text-lg">12</div>
              <div className="text-xs text-gray-500 font-medium tracking-wider mt-1">TRIPS</div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm italic leading-relaxed relative z-10">
            "Joining EzShift helped me manage my schedule better and find consistent work without any hassle."
          </p>
        </div>
      </div>
    </div>
  );
}
