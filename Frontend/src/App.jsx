import './App.css'
import LandingPage from './Pages/LandingPage'
import { Routes, Route } from "react-router";
import ClientLogin from './Pages/Login/ClientLogin';
import ClientDashboard from './Pages/Client/ClientDashboard';
import ClientHistory from './Pages/Client/ClientHistory';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/Client/Login" element={<ClientLogin />} />

        <Route path="/Client" >
          <Route path="Dashboard" index element={<ClientDashboard />} />
          <Route path="History" element={<ClientHistory/>} />
        </Route>

      </Routes>
    </>
  )
}

export default App
