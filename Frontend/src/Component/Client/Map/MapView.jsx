import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import useTripStore from '../../../store/useTripStore';

const ORS_API_KEY = '5b3ce3597851110001cf6248694b5dfdf31748509b54037cad134a7b';

const MapView = () => {
  const {
    pickupAddress,
    dropAddress,
    setDistance,
    setPricing,
    needWorkers,
    numWorkers,
    vehicleType,
    distance,
    pricing
  } = useTripStore();

  
  const [routeCoords, setRouteCoords] = useState([]);
  const [steps, setSteps] = useState([]);

  const getCoordinates = async (place) => {
    const response = await axios.get(
      `https://api.openrouteservice.org/geocode/search`,
      {
        params: {
          api_key: ORS_API_KEY,
          text: place,
        },
      }
    );
    return response.data.features[0].geometry.coordinates;
  };

  const getRoute = async () => {
    try {
      if (!pickupAddress || !dropAddress) return;

      const fromCoord = await getCoordinates(pickupAddress);
      const toCoord = await getCoordinates(dropAddress);

      const response = await axios.post(
        `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
        {
          coordinates: [fromCoord, toCoord],
          instructions: true,
        },
        {
          headers: {
            Authorization: ORS_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      const coords = response.data.features[0].geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
      );
      const segment = response.data.features[0].properties.segments[0];
      const instructions = segment.steps;
      const totalDistance = segment.distance / 1000; // meters to km

      setRouteCoords(coords);
      setSteps(instructions);
      setDistance(totalDistance.toFixed(2));

    } catch (error) {
      console.error('Route fetch failed:', error);
    }
  };

  useEffect(() => {
    getRoute();
  }, [pickupAddress, dropAddress, vehicleType, needWorkers, numWorkers]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-2/3 h-1/2 lg:h-full">
        <MapContainer center={[23.0225, 72.5714]} zoom={7} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {routeCoords.length > 0 && (
            <>
              <Polyline positions={routeCoords} color="#19a1e5" weight={5} />
              <Marker position={routeCoords[0]}>
                <Popup>Start: {pickupAddress}</Popup>
              </Marker>
              <Marker position={routeCoords[routeCoords.length - 1]}>
                <Popup>Destination: {dropAddress}</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>

      <div className="lg:w-1/3 h-1/2 lg:h-full overflow-y-auto p-6 bg-gray-50">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Details</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 mb-2"><strong>From:</strong> {pickupAddress}</p>
            <p className="text-gray-600"><strong>To:</strong> {dropAddress}</p>
            <hr className="my-3" />
            <p className="text-lg font-semibold text-gray-700">Distance: <span className="text-blue-500">{distance} km</span></p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Pricing</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            <p>Base Charge: <span className="font-semibold">₹{pricing?.base ?? 0}</span></p>
            <p>Vehicle Cost ({vehicleType}): <span className="font-semibold">₹{pricing?.vehicle?.toFixed(2) ?? '0.00'}</span></p>
            {needWorkers && (
              <p>Worker Cost ({numWorkers} x ₹200): <span className="font-semibold">₹{pricing?.workers ?? 0}</span></p>
            )}
            <hr className="my-2" />
            <div className="text-lg font-bold flex justify-between text-blue-500">
              <span>Total:</span>
              <span>₹{pricing?.total ?? 0}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow flex items-start space-x-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">{step.instruction}</p>
                  <p className="text-sm text-gray-500">{(step.distance / 1000).toFixed(2)} km</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;