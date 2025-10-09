import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FirstSetup() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/Worker/SetupProfile/City');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-10">
        
        <div>
          <h1 className="text-3xl font-bold mb-6">
            Hey Worker. Ready for your next big opportunity?
          </h1>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-lg">
              <span className="text-2xl mr-3">🧑‍💼</span>
              Answer a few questions and start building your profile
            </li>
            <li className="flex items-center text-lg">
              <span className="text-2xl mr-3">📩</span>
              Apply for open roles or list services for clients to buy
            </li>
            <li className="flex items-center text-lg">
              <span className="text-2xl mr-3">💰</span>
              Get paid safely and know we’re there to help
            </li>
          </ul>
          <button
            onClick={handleStartClick}
            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-all"
          >
            Get started
          </button>
          <p className="text-sm text-gray-500 mt-4">
            It only takes 5–10 minutes and you can edit it later. We’ll save as you go.
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center shadow mb-4">
            <span className="text-4xl">👤</span>
          </div>
          <h2 className="text-xl font-bold">
            <p>Vipul Sisodiya</p>
            <p>Dharmik Lathiya</p>
          </h2>
          <p className="text-gray-500 mb-2">CEO at Tevron Infotech</p>
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 mb-4">
            <span className="flex items-center"><span className="text-yellow-500">⭐</span> 5.0</span>
            <span>$100.00/hr</span>
            <span className="flex items-center"><span className="text-yellow-500">📁</span> 5 jobs</span>
          </div>
          <p className="text-gray-600 text-sm italic">
            “I turned to Upwork as a way to gain more control of my career.
            I love being able to choose everything from who I work with to how I spend my day.”
          </p>
          <div className="flex justify-center mt-4 space-x-1">
            <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>

      </div>
    </div>
  );
}
