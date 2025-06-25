import './App.css'
import LandingPage from './Pages/LandingPage'
import { Routes, Route } from "react-router";
import ClientLogin from './Pages/Login/ClientLogin';
import ClientDashboard from './Pages/Client/ClientDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/Client/Login" element={<ClientLogin />} />

        <Route path="/Client" element={<ClientDashboard/>} >
          <Route path="Dashboard" element={<ClientDashboard />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
