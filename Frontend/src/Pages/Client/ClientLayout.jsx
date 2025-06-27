import React from 'react'
import ClientHeader from '../../Component/Client/ClientHeader'
import { Outlet } from 'react-router-dom';

export default function ClientLayout() {
  return (
    <>
    <ClientHeader/>
    <Outlet/>
    </>
  )
}
