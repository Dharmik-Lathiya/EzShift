import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useVehicleStore from '../../../store/useVehicleStore';

import { 
  FaTruckPickup, 
  FaShuttleVan, 
  FaTruckMoving, 
  FaTruckMonster, 
  FaTruckLoading, 
  FaTruck 
} from 'react-icons/fa';

const vehicleOptions = [
  { value: 'miniTruck', name: 'Mini Truck', icon: <FaTruckMoving size={24} /> }, 
  { value: 'smallVan', name: 'Small Van', icon: <FaShuttleVan size={24} /> },
  { value: 'pickupTruck', name: 'Pickup Truck', icon: <FaTruckPickup size={24} /> },
  { value: 'mediumDutyTruck', name: 'Medium Duty Truck', icon: <FaTruckMonster size={24} /> },
  { value: 'containerTruck', name: 'Container Truck', icon: <FaTruckLoading size={24} /> }, 
  { value: 'openBodyTruck', name: 'Open Body Truck', icon: <FaTruck size={24} /> }, 
];

export default function ThirdSetup() {
  const { vehicleType } = useVehicleStore();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (vehicleValue) => {
    setSelected(vehicleValue);
  };

  const handleSubmit = () => {
    if (!selected) {
      alert('Please select a vehicle.');
      return;
    }

    // Save to zustand store
    useVehicleStore.getState().setVehicleType(selected);
    console.log('Zustand vehicle:', useVehicleStore.getState().vehicleType);

    navigate("/Worker/SetupProfile/VehicleInformation");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Choose Your Vehicle</h2>
          <p className="text-gray-500 text-sm">Select the type of vehicle you will use for shifts.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {vehicleOptions.map((vehicle, index) => (
            <button
              key={index}
              onClick={() => handleSelect(vehicle.value)}
              className={`border rounded-xl p-5 flex flex-col items-center justify-center transition-all ${
                selected === vehicle.value 
                ? 'border-primary bg-primary-light text-primary shadow-sm ring-1 ring-primary' 
                : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`mb-3 ${selected === vehicle.value ? 'text-primary' : 'text-gray-400'}`}>
                {vehicle.icon}
              </div>
              <span className={`text-sm font-semibold text-center ${selected === vehicle.value ? 'text-gray-900' : 'text-gray-700'}`}>
                {vehicle.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white font-semibold py-2.5 px-8 rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
