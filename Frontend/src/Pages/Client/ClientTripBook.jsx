import React, { useState } from 'react';
import axios from 'axios';
import useTripStore from '../../store/useTripStore';
import ClientTripPricing from '../../Component/Client/BookTrip/ClientTripPricing';

export default function ClientTripBook() {
  const {
    pickupAddress,
    dropAddress,
    vehicleType,
    needWorkers,
    numWorkers,
    distance,
    pricing,
    setPickupAddress,
    setDropAddress,
    setVehicleType,
    setNeedWorkers,
    setNumWorkers,
    setDistance,
    setPricing
  } = useTripStore();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNo: '',
    pickUp: '',
    destination: '',
    date: '',
    timeSloat: '',
    vehicelType: '',
    workers: '',
    note: ''
  });

  const ORS_API_KEY = '5b3ce3597851110001cf6248694b5dfdf31748509b54037cad134a7b';

  const calculateDistanceAndPrice = async () => {
    try {
      const geoCode = async (place) => {
        const res = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
          params: {
            api_key: ORS_API_KEY,
            text: place
          }
        });
        return res.data.features[0].geometry.coordinates;
      };

      const start = await geoCode(formData.pickUp);
      const end = await geoCode(formData.destination);

      const route = await axios.post(
        `https://api.openrouteservice.org/v2/directions/driving-car`,
        { coordinates: [start, end] },
        { headers: { Authorization: ORS_API_KEY } }
      );

      const distKm = route.data.routes[0].summary.distance / 1000;
      setDistance(distKm.toFixed(2));

      let ratePerKm = 0;
      switch (formData.vehicelType) {
        case 'pickup':
          ratePerKm = 10;
          break;
        case 'van':
          ratePerKm = 15;
          break;
        case 'heavy':
          ratePerKm = 20;
          break;
        default:
          ratePerKm = 0;
      }

      const baseCharge = 100;
      const vehicleCost = ratePerKm * distKm;
      const workerCost = needWorkers ? numWorkers * 200 : 0;

      const total = baseCharge + vehicleCost + workerCost;

      setPricing({
        base: baseCharge,
        vehicle: vehicleCost,
        workers: workerCost,
        total: total.toFixed(2)
      });
    } catch (error) {
      console.error('Distance calculation error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'pickUp') setPickupAddress(value);
    if (name === 'destination') setDropAddress(value);
    if (name === 'vehicelType') setVehicleType(value);
    if (name === 'workers') setNumWorkers(Number(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await calculateDistanceAndPrice();
  };

  return (
    <div className="w-full px-6 lg:px-20 py-10 max-w-screen-xl mx-auto">
      {/* ... form fields stay the same ... */}
       <div className="mb-6">
        <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight">Book Your Shift</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex flex-col flex-1 min-w-[280px]">
          <p className="text-[#111518] text-base font-medium pb-2">Full Name</p>
          <input
            placeholder="Enter your full name"
            name='fullName'
            onChange={handleChange}
            required
            className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4 text-base placeholder:text-[#637c88] focus:outline-0"
          />
        </label>
        <label className="flex flex-col flex-1 min-w-[280px]">
          <p className="text-[#111518] text-base font-medium pb-2">Mobile No.</p>
          <input
            placeholder="Enter your mobile number"
            name='mobileNo'
            onChange={handleChange}
            required
            className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4 text-base placeholder:text-[#637c88] focus:outline-0"
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <label className="flex flex-col">
          <p className="text-[#111518] text-base font-medium pb-2">Pickup Address</p>
          <textarea
            placeholder="Enter pickup address"
            onChange={handleChange}
            name='pickUp'
            required
            className="form-input rounded-xl bg-[#f0f3f4] min-h-36 p-4 text-base placeholder:text-[#637c88] focus:outline-0"
          />
        </label>
        <label className="flex flex-col">
          <p className="text-[#111518] text-base font-medium pb-2">Destination Address</p>
          <textarea
            placeholder="Enter destination address"
            onChange={handleChange}
            name='destination'
            required
            className="form-input rounded-xl bg-[#f0f3f4] min-h-36 p-4 text-base placeholder:text-[#637c88] focus:outline-0"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 w-full">
        <label className="flex flex-col flex-1 min-w-[280px]">
          <p className="text-[#111518] text-base font-medium pb-2">Preferred shifting date</p>
          <input
            type="date"
            onChange={handleChange}
            name='date'
            required
            className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4 text-base text-[#111518] focus:outline-0"
          />
        </label>
        <label className="flex flex-col flex-1 min-w-[280px]">
          <p className="text-[#111518] text-base font-medium pb-2">Preferred shifting time slot</p>
          <select onChange={handleChange} name='timeSloat' className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4 text-base text-[#111518] focus:outline-0" required>
            <option value="">Select time slot</option>
            <option value="morning">Morning (8–12)</option>
            <option value="afternoon">Afternoon (12–4)</option>
            <option value="evening">Evening (4–8)</option>
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-4 mb-4 max-w-[480px]">
        <label className="flex flex-col">
          <p className="text-[#111518] text-base font-medium pb-2">Select Vehicle Type</p>
          <select onChange={handleChange} name='vehicelType' className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4 text-base text-[#111518] focus:outline-0" required>
            <option value="">Select vehicle type</option>
            <option value="pickup">Pickup Truck</option>
            <option value="van">Small Van</option>
            <option value="heavy">Heavy Truck</option>
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-x-3">
          <input
            type="checkbox"
            onChange={() => setNeedWorkers(!needWorkers)}
            name='workersCheck'
            className="h-5 w-5 rounded border-[#dce2e5] border-2 text-[#19a1e5] checked:bg-[#19a1e5] checked:border-[#19a1e5] focus:ring-0 focus:outline-none"
          />
          <p className="text-[#111518] text-base font-normal">Help required with loading/unloading</p>
        </label>
      </div>

      {needWorkers && (
        <div className="flex flex-wrap gap-4 mb-4 max-w-[480px]">
          <label className="flex flex-col flex-1 min-w-[280px]">
            <p className="text-[#111518] text-base font-medium pb-2">Number of Workers</p>
            <input
              type="number"
              onChange={handleChange}
              name='workers'
              placeholder="Enter number of workers"
              className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4 text-base placeholder:text-[#637c88] focus:outline-0"
            />
          </label>
        </div>
      )}

      <div className="flex flex-col gap-4 mb-4 max-w-[480px]">
        <label className="flex flex-col">
          <p className="text-[#111518] text-base font-medium pb-2">Item List / Notes (optional)</p>
          <textarea
            placeholder="Enter item list or notes"
            onChange={handleChange}
            name='note'
            className="form-input rounded-xl bg-[#f0f3f4] min-h-36 p-4 text-base placeholder:text-[#637c88] focus:outline-0"
          ></textarea>
        </label>
      </div>

      <div className="flex justify-start">
        <button onClick={handleSubmit} className="rounded-full h-12 px-6 bg-[#19a1e5] text-white text-base font-bold hover:bg-[#138ccc] transition">
          Show Pricing
        </button>
      </div>

      <ClientTripPricing />
    </div>
  );
}
