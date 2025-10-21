import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminBottomBar from '../../components/admin/AdminBottomBar'
import AdminHeader from '../../components/admin/AdminHeader'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Layout = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  console.log(user)
  
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
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