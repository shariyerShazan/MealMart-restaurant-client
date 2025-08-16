import React from 'react'
import { Outlet } from 'react-router'
import DashboardNav from '../components/shared/Admin/DashboardNav'

const DashboardLayout = () => {
  return (
    <div>
        <DashboardNav />
        <Outlet />
    </div>
  )
}

export default DashboardLayout
