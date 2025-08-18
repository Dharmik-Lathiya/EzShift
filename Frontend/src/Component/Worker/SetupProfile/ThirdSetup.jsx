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
  { value: 'miniTruck', name: 'Mini Truck', icon: <FaTruckMoving size={28} /> }, 
  { value: 'smallVan', name: 'Small Van', icon: <FaShuttleVan size={28} /> },
  { value: 'pickupTruck', name: 'Pickup Truck', icon: <FaTruckPickup size={28} /> },
  { value: 'mediumDutyTruck', name: 'Medium Duty Truck', icon: <FaTruckMonster size={28} /> },
  { value: 'containerTruck', name: 'Container Truck', icon: <FaTruckLoading size={28} /> }, 
  { value: 'openBodyTruck', name: 'Open Body Truck', icon: <FaTruck size={28} /> }, 
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
    <div className="flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Vehicle</h2>

        <div className="grid grid-cols-2 gap-4">
          {vehicleOptions.map((vehicle, index) => (
            <button
              key={index}
              onClick={() => handleSelect(vehicle.value)}
              className={`border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-100 transition ${
                selected === vehicle.value ? 'border-green-600 bg-green-50' : 'border-gray-300'
              }`}
            >
              <div className="mb-2">{vehicle.icon}</div>
              <span className="text-sm font-medium text-center">{vehicle.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
