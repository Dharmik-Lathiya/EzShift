import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function SecondSetup() {
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCity) {
      alert("Please select a city.");
      return;
    }

    console.log("Selected city:", selectedCity);
    navigate('/Worker/SetupProfile/VehicleType');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Select Your City</h2>
        
        <select 
          value={selectedCity} 
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
        >
          <option value="">-- Choose a city --</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
