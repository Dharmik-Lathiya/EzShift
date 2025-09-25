import React from 'react'
import ClientHeader from '../../Component/Client/ClientHeader'
import { Outlet } from 'react-router-dom';
import LandingFooter from '../../Component/Landing/LandingFooter';

export default function ClientLayout() {
  return (
    <>
    <ClientHeader/>
    <Outlet/>
    <LandingFooter/>
    </>
  )
}
