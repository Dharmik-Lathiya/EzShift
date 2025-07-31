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
        <Route path="/Client/Login" element={<ClientLogin />} />

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
   
        </Route>

        <Route path="/Worker" element={<WorkerLayout />}>
          <Route index element={<div>Dashboard</div>} />
          <Route path="Trips" element={<div>Dashboard</div>} />
          <Route path="Profile" element={<div>Dashboard</div>} />
        </Route>


        
        {/* <Route path="/payment-failure" element={<PaymentFailure />} /> */}

      </Routes>
    </>
  )
}

export default App
