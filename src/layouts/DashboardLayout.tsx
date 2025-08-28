import React from 'react'
import { Outlet } from 'react-router'
import DashboardNav from '../components/shared/Admin/DashboardNav'
import Footer from '../components/shared/Footer'

const DashboardLayout = () => {
  return (
    <div>
        <DashboardNav />
        <Outlet />
        <Footer />
    </div>
  )
}

export default DashboardLayout
