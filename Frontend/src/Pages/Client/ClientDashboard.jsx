import React from "react";
import LandingHeader from "../../Component/Landing/LandingHeader";
import ClientDashboardMain from "../../Component/Client/Dashboard/ClientDashboardMain";
import ClientDashboardHeader from "../../Component/Client/Dashboard/ClientDashboardHeader";
import ClientNavbar from "../../Component/Client/Dashboard/ClientNavbar";

export default function ClientDashboard() {
  return (
    <>
      <ClientNavbar />
      <ClientDashboardMain />
      <ClientDashboardHeader />
    </>
  );
}
