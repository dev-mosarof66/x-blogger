import { Outlet } from "react-router-dom"
import Navbar from "../../components/custom/Navbar"

const Landing = () => {
  return (
    <div className={`w-full bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900`}>
      <Navbar />
      <Outlet />

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} X Blogger — For Tech Enthusiasts & Developers
      </footer>
    </div>
  )
}

export default Landing