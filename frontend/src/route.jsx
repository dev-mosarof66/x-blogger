import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Suspense, useEffect, useState } from 'react'

import ThemeProvider from './utils/ThemeProvider'
import axiosInstance from './utils/axios'
import { setUser } from './features/user.slices'

import Landing from './pages/user/Landing'
import Layout from './pages/user/Layout'
import Blogs from './pages/user/Blogs'
import Blog from './pages/user/Blog'
import NewsLetter from './pages/user/NewsLetter'
import DailyDigest from './pages/user/DailyDigest'
import Tips_Tricks from './pages/user/Tips&Tricks'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/user/VerifyEmail'
import ProfileLayout from './pages/user/ProfileLayout'
import LoadingSpinner from './components/custom/Loader'
import Profile from './pages/user/Profile'


import AdminLayout from './pages/admin/Layout'
import AdminHome from './pages/admin/Home'
import BlogList from './pages/admin/BlogList'
import CreateBlog from './pages/admin/CreateBlog'
import AdminProfile from './pages/admin/Profile'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/user/profile')
        console.log('Fetched user:', res.data)

        if (res?.data?.success) {
          const data = res.data.user

          dispatch(setUser(data))

        }
      } catch (error) {
        if (error?.response?.status === 401) {
          console.warn('Not logged in')
        } else {
          console.error('error in fetching user data:', error);
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [dispatch, navigate])


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    )
  }


  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ThemeProvider>
        <Routes>

          {/* user  */}
          <Route path='/' element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path='blogs' element={<Blogs />} />
            <Route path='blog/:id' element={<Blog />} />
            <Route path='news-letter' element={<NewsLetter />} />
            <Route
              path='/profile'
              element={user && user.role === 'user' ? <ProfileLayout /> : <Navigate to='/' replace />}>
              <Route index element={<Profile />} />
            </Route>

            <Route
              path='digest'
              element={
                user?.isPro ? (
                  <DailyDigest />
                ) : (
                  <Navigate to='/login' replace />
                )
              }
            />
            <Route
              path='tips&tricks'
              element={
                user?.isPro ? (
                  <Tips_Tricks />
                ) : (
                  <Navigate to='/login' replace />
                )
              }
            />
          </Route>

          {/* admin */}

          <Route path='/admin' element={<AdminLayout />} >

            <Route index element={<AdminHome />} />
            <Route path='profile' element={<AdminProfile />} />
            <Route path='blogs/all' element={<BlogList />} />
            <Route path='blogs/create' element={<CreateBlog />} />
          </Route>

          <Route
            path='/login'
            element={user ? <Navigate to='/' replace /> : <Login />}
          />
          <Route
            path='/register'
            element={user ? <Navigate to='/' replace /> : <Register />}
          />

          <Route
            path='/verify-email/:id'
            element={user ? <Navigate to='/' replace /> : <VerifyEmail />}
          />


          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
