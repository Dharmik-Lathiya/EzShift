import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useTripStore from '../../store/useTripStore';
import ClientTripPricing from '../../Component/Client/BookTrip/ClientTripPricing';
import { MapPin, Calendar, Clock, Truck, Users, FileText } from 'lucide-react';

export default function ClientTripBook() {
  const {
    setClientId,
    setPickupAddress,
    setDropAddress,
    setDate,
    setTimeSlot,
    setVehicleType,
    setNeedWorkers,
    setNumWorkers,
    setNote,
    setDistance,
    calculateAndSetPricing,
    needWorkers,
    distance,
    vehicleType,
    numWorkers,
  } = useTripStore();

  const [showPricing, setShowPricing] = useState(false);
  const [formData, setFormData] = useState({
    pickUp: '',
    destination: '',
    date: '',
    timeSloat: '',
    vehicelType: '',
    workers: '',
    note: '',
  });

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const ORS_API_KEY = '5b3ce3597851110001cf6248694b5dfdf31748509b54037cad134a7b';

  useEffect(() => {
    setClientId(localStorage.getItem('clientId') || '');
  }, [setClientId]);

  const fetchSuggestions = async (query, setter) => {
    if (!query) return setter([]);
    try {
      const res = await axios.get(`https://api.openrouteservice.org/geocode/autocomplete`, {
        params: {
          api_key: ORS_API_KEY,
          text: query,
          size: 5,
        },
      });
      const suggestions = res.data.features.map((f) => ({
        label: f.properties.label,
        coordinates: f.geometry.coordinates,
      }));
      setter(suggestions);
    } catch (err) {
      console.error('Autocomplete error:', err);
    }
  };

  const calculateDistance = async () => {
    try {
      if (!formData.pickUp || !formData.destination) {
        toast.error("Please enter both pickup and destination addresses.");
        return;
      }

      const geoCode = async (place) => {
        const res = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
          params: { api_key: ORS_API_KEY, text: place },
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
      case 'pickUp':
        setPickupAddress(value);
        fetchSuggestions(value, setPickupSuggestions);
        break;
      case 'destination':
        setDropAddress(value);
        fetchSuggestions(value, setDestinationSuggestions);
        break;
      case 'date': setDate(value); break;
      case 'timeSloat': setTimeSlot(value); break;
      case 'vehicelType': setVehicleType(value); break;
      case 'workers': setNumWorkers(Number(value)); break;
      case 'note': setNote(value); break;
      default: break;
    }
  };

  const handleSelectSuggestion = (type, suggestion) => {
    if (type === 'pickup') {
      setFormData((prev) => ({ ...prev, pickUp: suggestion.label }));
      setPickupAddress(suggestion.label);
      setPickupSuggestions([]);
    } else {
      setFormData((prev) => ({ ...prev, destination: suggestion.label }));
      setDropAddress(suggestion.label);
      setDestinationSuggestions([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await calculateDistance();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Book Your Shift</h1>
          <p className="mt-2 text-gray-600">Fill out the details below to get an instant quote and book your vehicle.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            
            {/* Location Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <MapPin className="text-primary" size={20} />
                Location Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Address</label>
                  <textarea
                    name="pickUp"
                    value={formData.pickUp}
                    onChange={handleChange}
                    required
                    placeholder="Enter pickup address"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all resize-none h-24"
                  />
                  {pickupSuggestions.length > 0 && (
                    <ul className="absolute top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg w-full z-20 max-h-48 overflow-y-auto">
                      {pickupSuggestions.map((s, i) => (
                        <li
                          key={i}
                          onClick={() => handleSelectSuggestion('pickup', s)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-0 border-gray-100"
                        >
                          {s.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Destination Address</label>
                  <textarea
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    placeholder="Enter destination address"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all resize-none h-24"
                  />
                  {destinationSuggestions.length > 0 && (
                    <ul className="absolute top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg w-full z-20 max-h-48 overflow-y-auto">
                      {destinationSuggestions.map((s, i) => (
                        <li
                          key={i}
                          onClick={() => handleSelectSuggestion('destination', s)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-0 border-gray-100"
                        >
                          {s.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Calendar className="text-primary" size={20} />
                Schedule
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    onChange={handleChange} 
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <Clock size={16} className="text-gray-400" /> Time Slot
                  </label>
                  <select 
                    name="timeSloat" 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all appearance-none"
                  >
                    <option value="">Select time slot</option>
                    <option value="morning">Morning (8 AM – 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
                    <option value="evening">Evening (4 PM – 8 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle & Requirements */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Truck className="text-primary" size={20} />
                Vehicle & Requirements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Vehicle Type</label>
                  <select 
                    name="vehicelType" 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all appearance-none"
                  >
                    <option value="">Select vehicle type</option>
                    <option value="miniTruck">Mini Truck</option>
                    <option value="smallVan">Small Van</option>
                    <option value="pickupTruck">Pickup Truck</option>
                    <option value="mediumDutyTruck">Medium Duty Truck</option>
                    <option value="containerTruck">Container Truck</option>
                    <option value="openBodyTruck">Open Body Truck</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-primary-light hover:border-primary transition-colors">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={needWorkers}
                        onChange={() => setNeedWorkers(!needWorkers)}
                        className="w-5 h-5 border-2 border-gray-300 rounded text-primary focus:ring-primary focus:ring-offset-0 transition-colors"
                      />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-gray-900">Need Loading Help?</span>
                      <span className="block text-xs text-gray-500">Require workers for loading/unloading</span>
                    </div>
                  </label>
                </div>
              </div>

              {needWorkers && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Users size={16} className="text-primary" /> Number of Workers
                  </label>
                  <input 
                    type="number" 
                    name="workers" 
                    onChange={handleChange} 
                    placeholder="e.g. 2"
                    min={1} 
                    max={10}
                    className="w-full md:w-1/2 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all" 
                  />
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="text-primary" size={20} />
                Additional Notes
              </h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Item List / Notes (optional)</label>
                <textarea 
                  name="note" 
                  onChange={handleChange} 
                  placeholder="E.g., Fragile items, large furniture, gate pass required..."
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all resize-none h-32" 
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-sm hover:bg-primary-hover hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                Calculate Distance & Get Quote
              </button>
            </div>
          </form>
        </div>

        {showPricing && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ClientTripPricing />
          </div>
        )}
      </div>
    </div>
  );
}
