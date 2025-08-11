import React from 'react';
import { FaRegSmileWink } from 'react-icons/fa';
import { useNavigate } from 'react-router';

export default function FifthSetup() {

const navigate = useNavigate();

    const handleChange = ()=>{
        navigate("/Worker");
    }

  return (
    <div className="flex items-center justify-center p-20">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
        <FaRegSmileWink className="text-5xl text-blue-600 mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Captain!</h1>
        <p className="text-gray-600 text-lg">You're all set to start your journey with us.</p>
        <p className="text-sm text-gray-500 mt-4">Let's make moving simple and seamless. 🚛✨</p>
        <button onClick={handleChange} className='bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-all mt-4'>Let's Go</button>
      </div>
    </div>
  );
}
