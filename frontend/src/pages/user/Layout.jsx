import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../../components/custom/Navbar"
import { useEffect } from "react"
import axiosInstance from "../../utils/axios"
import { useDispatch } from "react-redux"
import { setBlogs, setTrendingBlogs } from "../../features/blogs.slices"
import { setTags } from "../../features/tags.slices"

const Landing = () => {
  const locaton = useLocation()
  const dispatch = useDispatch()



  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get('/user/blogs');
        if (res.data.success) {
          dispatch(setBlogs(res.data.blogs))
        }
      } catch (error) {
        console.log("error while fetching blogs : ", error)
      }
    }
    const fetchTrendingBlog = async () => {
      try {
        const res = await axiosInstance.get('/user/trending');
        if (res.data.success) {
          console.log(res.data.blogs)
          dispatch(setTrendingBlogs(res.data.blogs))
        }
      } catch (error) {
        console.log("error while fetching blogs : ", error)
      }
    }

    const fetchAllTags = async () => {
      try {
        const res = await axiosInstance.get('/user/tags')

        if (res.data.success) {
          dispatch(setTags(res.data.tags))
        }
      } catch (error) {
        console.log('error while fetching all tags : ', error)
      }
    }
    fetchBlogs()
    fetchTrendingBlog()
    fetchAllTags()
  }, [dispatch])

  //reset to 0

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={`w-full bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900`}>
      <Navbar />
      <Outlet />
      {
        locaton.pathname !== '/profile' && (

          <footer footer className="py-8 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
            © {new Date().getFullYear()} X Blogger — For Tech Enthusiasts & Developers
          </footer>
        )
      }
    </div >
  )
}

export default Landing