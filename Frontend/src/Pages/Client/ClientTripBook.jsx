// src/pages/ClientTripBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useTripStore from '../../store/useTripStore';
import ClientTripPricing from '../../Component/Client/BookTrip/ClientTripPricing';

export default function ClientTripBook() {


  const {
    clientId,
    setClientId,
    pickupAddress,
    dropAddress,
    vehicleType,
    needWorkers,
    numWorkers,
    distance,
    pricing,
    setPickupAddress,
    setDropAddress,
    setDate,
    setTimeSlot,
    setVehicleType,
    setNeedWorkers,
    setNumWorkers,
    setNote,
    setDistance,
    setPricing,
    calculateAndSetPricing
  } = useTripStore();

  const [showPricing, setShowPricing] = useState(false);

  const [formData, setFormData] = useState({
    clientId: '',
    pickUp: '',
    destination: '',
    date: '',
    timeSloat: '',
    vehicelType: '',
    workers: '',
    note: '',
    
  });

  useEffect(() => {
    setClientId(localStorage.getItem('clientId') || '');
  }, [setClientId]);

  const ORS_API_KEY = '5b3ce3597851110001cf6248694b5dfdf31748509b54037cad134a7b';

  const calculateDistance = async () => {
    try {
      if (!formData.pickUp || !formData.destination) {
        toast.error("Please enter both pickup and destination addresses.");
        return;
      }

      const geoCode = async (place) => {
        const res = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
          params: { api_key: ORS_API_KEY, text: place }
        });
        if (!res.data.features || res.data.features.length === 0) {
          throw new Error(`No coordinates found for: ${place}`);
        }
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
    } catch (error) {
      console.error('Distance calculation error:', error);
      toast.error(error.message || "Distance calculation failed.");
    }
  };

  useEffect(() => {
    if (distance && vehicleType) {
        calculateAndSetPricing();
        setShowPricing(true);
    }
  }, [distance, vehicleType, numWorkers, calculateAndSetPricing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case 'pickUp': setPickupAddress(value); break;
      case 'destination': setDropAddress(value); break;
      case 'date': setDate(value); break;
      case 'timeSloat': setTimeSlot(value); break;
      case 'vehicelType': setVehicleType(value); break;
      case 'workers': setNumWorkers(Number(value)); break;
      case 'note': setNote(value); break;
      default: break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await calculateDistance();
  };

  return (
    <div className="w-full px-6 lg:px-20 py-10 max-w-screen-xl mx-auto">
      <div className="mb-6">
        <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight">Book Your Shift</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-4">
          <label className="flex flex-col">
            <p className="text-[#111518] text-base font-medium pb-2">Pickup Address</p>
            <textarea name="pickUp" onChange={handleChange} required placeholder="Enter pickup address"
              className="form-input rounded-xl bg-[#f0f3f4] min-h-36 p-4" />
          </label>
          <label className="flex flex-col">
            <p className="text-[#111518] text-base font-medium pb-2">Destination Address</p>
            <textarea name="destination" onChange={handleChange} required placeholder="Enter destination address"
              className="form-input rounded-xl bg-[#f0f3f4] min-h-36 p-4" />
          </label>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex flex-col flex-1 min-w-[280px]">
            <p className="text-[#111518] text-base font-medium pb-2">Preferred shifting date</p>
            <input type="date" name="date" onChange={handleChange} required
              className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4" />
          </label>
          <label className="flex flex-col flex-1 min-w-[280px]">
            <p className="text-[#111518] text-base font-medium pb-2">Preferred time slot</p>
            <select name="timeSloat" onChange={handleChange} required
              className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4">
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
            <select name="vehicelType" onChange={handleChange} required
              className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4">
              <option value="">Select vehicle type</option>
              <option value="miniTruck">Mini Truck</option>
              <option value="smallVan">Small Van</option>
              <option value="pickupTruck">Pickup Truck</option>
              <option value="mediumDutyTruck">Medium Duty Truck</option>
              <option value="containerTruck">Container Truck</option>
              <option value="openBodyTruck">Open Body Truck</option>
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-x-3">
            <input
  type="checkbox"
  checked={needWorkers}
  onChange={() => setNeedWorkers(!needWorkers)}
  className="h-5 w-5 border-[#dce2e5]"
/>

            <p className="text-[#111518] text-base font-normal">Help required with loading/unloading</p>
          </label>
        </div>

        {needWorkers && (
          <div className="flex flex-wrap gap-4 mb-4 max-w-[480px]">
            <label className="flex flex-col flex-1 min-w-[280px]">
              <p className="text-[#111518] text-base font-medium pb-2">Number of Workers</p>
              <input type="number" name="workers" onChange={handleChange} placeholder="Enter number of workers"
                className="form-input rounded-xl bg-[#f0f3f4] h-14 p-4" />
            </label>
          </div>
        )}

        <div className="flex flex-col gap-4 mb-4 max-w-[480px]">
          <label className="flex flex-col">
            <p className="text-[#111518] text-base font-medium pb-2">Item List / Notes (optional)</p>
            <textarea name="note" onChange={handleChange} placeholder="Enter item list or notes"
              className="form-input rounded-xl bg-[#f0f3f4] min-h-36 p-4" />
          </label>
        </div>

        <div className="flex justify-start">
          <button type="submit" className="rounded-full h-12 px-6 bg-[#19a1e5] text-white text-base font-bold hover:bg-[#138ccc] transition">
            Calculate Distance
          </button>
        </div>
      </form>

      {showPricing && <ClientTripPricing />}
    </div>
  );
}
