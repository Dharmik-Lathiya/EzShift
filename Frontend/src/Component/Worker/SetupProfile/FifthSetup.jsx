import React from 'react';
import { useNavigate } from 'react-router';

export default function FifthSetup() {

  const navigate = useNavigate();

  const handleChange = () => {
    navigate("/Worker");
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-sm border border-gray-200 rounded-3xl p-12 text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-check text-4xl text-green-500"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">You're all set!</h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Your profile has been created and your vehicle details are submitted. You can now start exploring available shifts.
        </p>
        
        <button 
          onClick={handleChange} 
          className="w-full bg-primary text-white font-semibold py-3.5 px-6 rounded-lg text-lg hover:bg-primary-hover transition-colors shadow-sm"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
