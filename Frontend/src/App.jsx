import './App.css'
import LandingPage from './Pages/LandingPage'
import { Routes, Route, useNavigate } from "react-router";
import ClientLogin from './Pages/Login/ClientLogin';
import ClientDashboard from './Pages/Client/ClientDashboard';
import ClientHistory from './Pages/Client/ClientHistory';
import ClientProfile from './Pages/Client/ClientProfile';
import ClientMap from './Pages/Client/ClientMap';
import ClientTripBook from './Pages/Client/ClientTripBook';
import ClientLayout from './Pages/Client/ClientLayout';
import PaymentSuccess from './Component/Client/PaymentSuccess';
import { useEffect } from 'react';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminLayout from './Pages/Admin/AdminLayout';
import AdminTrips from './Pages/Admin/AdminTrips';
import AdminUsers from './Pages/Admin/AdminUsers';
import WorkerLayout from './Pages/Worker/WorkerLayout';
import WorkerDashboard from './Pages/Worker/WorkerDashboard';
import WorkerTrips from './Pages/Worker/WorkerTrips';
import WorkerVehicle from './Pages/Worker/WorkerVehicle';
import AdminVehicles from './Pages/Admin/AdminVehicles';
import WorkerLogin from './Pages/Login/WorkerLogin';
import WorkerSetup from './Pages/Worker/WorkerSetup';
import FirstSetup from './Component/Worker/SetupProfile/FirstSetup';
import SecondSetup from './Component/Worker/SetupProfile/SecondSetup';
import ThirdSetup from './Component/Worker/SetupProfile/ThirdSetup';
import FourthSetup from './Component/Worker/SetupProfile/FourthSetup';
import FifthSetup from './Component/Worker/SetupProfile/FifthSetup';
import WorkerProfile from './Pages/Worker/WorkerProfile';

function App() {

const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');
    if (redirectPath) {
      navigate(`/${redirectPath}`);
    }
  }, []);

  return (
    <>
      <Routes>

        <Route index element={<LandingPage />} />
        <Route path="/Client/Auth" element={<ClientLogin />} />
        <Route path="/Worker/Auth" element={<WorkerLogin />} />


        <Route path="/Client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="Dashboard" index element={<ClientDashboard />} />
          <Route path="History" element={<ClientHistory />} />
          <Route path="BookTrip" element={<ClientTripBook />} />
          <Route path="Profile" element={<ClientProfile />} />
          <Route path="Map" element={<ClientMap />} />
          <Route path="Payment/Success" element={<PaymentSuccess />} />
        </Route>

        <Route path="/Admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard/>} />
          <Route path="Trips" element={<AdminTrips />} />
          <Route path="Users" element={<AdminUsers />} />
          <Route path="Vehicles" element={<AdminVehicles />} />
        </Route>

        <Route path="/Worker" element={<WorkerLayout />}>
          <Route index element={<WorkerDashboard/>} />
          <Route path="Trips" element={<WorkerTrips />} />
          <Route path="Profile" element={<WorkerProfile />} />
          <Route path="Vehicle" element={<WorkerVehicle />} />
          <Route path="CompletedTrips" element={<div>Done</div>} />
        </Route>

        <Route path="/Worker/SetupProfile" element={<WorkerSetup />}>
          <Route index element={<FirstSetup/>} />
          <Route path="City" element={<SecondSetup />} />
          <Route path="VehicleType" element={<ThirdSetup />} />
          <Route path="VehicleInformation" element={<FourthSetup />} />
          <Route path="Welcome" element={<FifthSetup />} />
          
          
        </Route>


        
        {/* <Route path="/payment-failure" element={<PaymentFailure />} /> */}

      </Routes>
    </>
  )
}

export default App
