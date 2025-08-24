import React, { useEffect, useState } from 'react';
import useTripStore from '../../../store/useTripStore';
import { toast } from 'react-toastify';

const TripList = () => {
  const { allTrips, loading, error, fetchAllTrips, clearError } = useTripStore();
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    loadTrips();
  }, []);

  useEffect(() => {
    filterAndSortTrips();
  }, [allTrips, searchTerm, sortBy]);

  const loadTrips = async () => {
    try {
      await fetchAllTrips();
      toast.success('Trips loaded successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to load trips');
    }
  };

  const filterAndSortTrips = () => {
    let filtered = [...allTrips];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(trip =>
        trip.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.pickupAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.dropAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.vehicleType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'name':
          return (a.fullName || '').localeCompare(b.fullName || '');
        case 'price':
          return (b.pricing || 0) - (a.pricing || 0);
        case 'distance':
          return (b.distance || 0) - (a.distance || 0);
        default:
          return 0;
      }
    });

    setFilteredTrips(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    return timeString || 'N/A';
  };

  const getStatusColor = (date) => {
    const tripDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (tripDate < today) return 'text-red-600 bg-red-50';
    if (tripDate.getTime() === today.getTime()) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  // Payment handler placeholder

    // TODO: Implement payment logic/modal/redirect 
    

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Trips</h1>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, pickup, drop address, or vehicle type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="distance">Sort by Distance</option>
            </select>
          </div>
          <button
            onClick={loadTrips}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Trip Count */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredTrips.length} of {allTrips.length} trips
        </div>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No trips found</div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-600 hover:text-blue-800 mt-2"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip._id || trip.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {trip.fullName || 'N/A'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {trip.mobileNo || 'N/A'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.date)}`}>
                    {formatDate(trip.date)}
                  </span>
                </div>

                {/* Trip Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Pickup</p>
                    <p className="text-sm text-gray-600">{trip.pickupAddress || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Drop</p>
                    <p className="text-sm text-gray-600">{trip.dropAddress || 'N/A'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Time</p>
                      <p className="text-sm text-gray-600">{formatTime(trip.timeSlot)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Vehicle</p>
                      <p className="text-sm text-gray-600 capitalize">{trip.vehicleType || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Distance</p>
                      <p className="text-sm text-gray-600">{trip.distance ? `${trip.distance} km` : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Price</p>
                      <p className="text-sm text-gray-600">₹{trip.pricing || 'N/A'}</p>
                    </div>
                  </div>

                  {trip.needWorkers && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Workers</p>
                      <p className="text-sm text-gray-600">{trip.numWorkers || 0} workers</p>
                    </div>
                  )}

                  {trip.note && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Note</p>
                      <p className="text-sm text-gray-600">{trip.note}</p>
                    </div>
                  )}
                </div>
                {/* Payment Button: Only show if trip is completed and not paid */}
                {trip.status === 'Completed' && (
                  <div className="mt-4">
                    <button
                      onClick={() => handlePayment(trip)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList; 