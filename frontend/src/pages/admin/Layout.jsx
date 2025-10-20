import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/custom/AdminSidebar'
import AdminBottomBar from '../../components/custom/AdminBottomBar'
import AdminHeader from '../../components/custom/AdminHeader'

const Layout = () => {
  return (
    <div className='w-full h-screen flex bg-gradient-to-b from-purple-50 to-white dark:from-gray-800 dark:to-gray-900'>
      <AdminSidebar />
      <div className='flex-1 p-4 mb-20 md:mb-0'>
        <AdminHeader />
        <div className='flex-1 h-[90vh] overflow-y-scroll scrollbar-hidden py-4'>
          <Outlet />
        </div>
      </div>
      <AdminBottomBar />
    </div>
  )
}

export default Layout