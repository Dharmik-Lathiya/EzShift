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

      // Calculate pricing
      const baseCharge = 100;
      const vehicleRates = {
        mini: 10,
        sedan: 15,
        truck: 25,
      };
      const perKmRate = vehicleRates[vehicleType] || 15;
      const vehicleCost = totalDistance * perKmRate;
      const workerCost = needWorkers ? numWorkers * 200 : 0;

      setPricing({
        base: baseCharge,
        distance: vehicleCost,
        workers: workerCost,
        total: baseCharge + vehicleCost + workerCost,
      });
    } catch (error) {
      console.error('Route fetch failed:', error);
    }
  };

  useEffect(() => {
    getRoute();
  }, [pickupAddress, dropAddress, vehicleType, needWorkers, numWorkers]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '70vw', height: '100vh' }}>
        <MapContainer center={[23.0225, 72.5714]} zoom={7} style={{ height: '80vh' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {routeCoords.length > 0 && (
            <>
              <Polyline positions={routeCoords} color="blue" />
              <Marker position={routeCoords[0]}>
                <Popup>Start</Popup>
              </Marker>
              <Marker position={routeCoords[routeCoords.length - 1]}>
                <Popup>Destination</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>

      <div style={{ width: '30vw', height: '100vh', overflowY: 'scroll', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>Step-by-Step Instructions</h3>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>
              {step.instruction} ({(step.distance / 1000).toFixed(2)} km)
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MapView;
