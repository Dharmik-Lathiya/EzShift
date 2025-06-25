import React from 'react'
import LandingHeader from '../../Component/Landing/LandingHeader'
import ClientDashboardMain from '../../Component/Client/Dashboard/ClientDashboardMain'
import ClientDashboardHeader from '../../Component/Client/Dashboard/ClientDashboardHeader'

export default function ClientDashboard() {
  return (
    <>
      <LandingHeader/>
      <ClientDashboardMain/>
      <ClientDashboardHeader/>
    </>
  )
}
