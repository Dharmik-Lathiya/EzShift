import './App.css'
import LandingPage from './Pages/LandingPage'
import { Routes, Route } from "react-router";
import ClientLogin from './Pages/Login/ClientLogin';
import ClientDashboard from './Pages/Client/ClientDashboard';
import ClientHistory from './Pages/Client/ClientHistory';
import ClientProfile from './Pages/Client/ClientProfile';
import ClientMap from './Pages/Client/ClientMap';
import ClientTripBook from './Pages/Client/ClientTripBook';
import ClientLayout from './Pages/Client/ClientLayout';

function App() {
  return (
    <>
      <Routes>

        <Route index element={<LandingPage />} />
        <Route path="/Client/Login" element={<ClientLogin />} />

        <Route path="/Client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="Dashboard" index element={<ClientDashboard />} />
          <Route path="History" element={<ClientHistory />} />
          <Route path="BookTrip" element={<ClientTripBook />} />
          <Route path="Profile" element={<ClientProfile />} />
          <Route path="Map" element={<ClientMap />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
