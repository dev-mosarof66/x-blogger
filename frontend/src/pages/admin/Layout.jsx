import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminBottomBar from '../../components/admin/AdminBottomBar'
import AdminHeader from '../../components/admin/AdminHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axiosInstance from '../../utils/axios'
import { setTags } from '../../features/tags.slices'

const Layout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  console.log(user)

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  //fetch the tags here

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axiosInstance.get('/admin/tags');
        console.log(res.data)
        if (res.data.success) {
          dispatch(setTags(res.data.tags))
        }
      } catch (error) {
        console.error('error while fetching all tags : ', error)

      }
    }
    fetchTags()
  }, [dispatch])
  return (
    <div className='w-full h-screen flex bg-gradient-to-b from-purple-50 to-white dark:from-gray-800 dark:to-gray-900'>
      <AdminSidebar />
      <div className='flex-1 p-4'>
        <AdminHeader />
        <div className='flex-1 h-[80vh] xs:h-[82vh] overflow-y-scroll scrollbar-hidden py-4'>
          <Outlet />
        </div>
      </div>
      <AdminBottomBar />
    </div>
  )
}

export default Layout