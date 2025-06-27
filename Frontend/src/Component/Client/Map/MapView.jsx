import React, { useState } from 'react';
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

const MapView = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [routeCoords, setRouteCoords] = useState([]);
  const [steps, setSteps] = useState([]);

  const ORS_API_KEY = '5b3ce3597851110001cf6248694b5dfdf31748509b54037cad134a7b';

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
    const fromCoord = await getCoordinates(from);
    const toCoord = await getCoordinates(to);

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
    const instr = response.data.features[0].properties.segments[0].steps;

    setRouteCoords(coords);
    setSteps(instr);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '70vw', height: '100vh' }}>
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button onClick={getRoute}>Get Route</button>

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
