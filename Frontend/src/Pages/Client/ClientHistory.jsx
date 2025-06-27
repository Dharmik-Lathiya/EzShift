import React from "react";
import LandingHeader from "../../Component/Landing/LandingHeader";
import ClientHistoryMain from "../../Component/Client/History/ClientHistoryMain";
import ClientNavbar from "../../Component/Client/Dashboard/ClientNavbar";

export default function ClientHistory() {
  return (
    <>
      <ClientNavbar />
      <ClientHistoryMain />
    </>
  );
}
