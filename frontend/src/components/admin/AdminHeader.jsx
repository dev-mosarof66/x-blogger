import { useState } from "react";
import { MdLogout, MdPerson } from "react-icons/md";
import ThemeSetter from "../custom/ThemeSetter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileBox from "../custom/ProfileBox";
import axiosInstance from "../../utils/axios";
import { setUser } from "../../features/user.slices";
import toast from "react-hot-toast";

const AdminHeader = () => {
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post('/user/logout')
      console.log(res.data)
      if (res.data.success) {
        dispatch(setUser(null))
        toast.success("Logged out successfully.")
        navigate('/')
      }

    } catch (error) {
      console.log('error while logging out the user : ', error)
    }
  }
  return (
    <div className="w-full flex justify-end gap-4 items-center px-0 sm:px-4 border-b border-purple-600/20 pb-2">
      {/* Theme Switch */}
      <ThemeSetter />

      {/* Profile */}
      <div className="relative">
        <ProfileBox user={user} onClick={() => setMenuOpen(!menuOpen)} />
        {/* Dropdown */}
        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
            onMouseLeave={() => setMenuOpen(false)}
          >
            <div
              onClick={() => navigate("/admin/profile")}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-800/20 active:scale-95 cursor-pointer transition-all duration-300 delay-75"
            >
              <MdPerson />
              Profile
            </div>
            <div
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-800/20 active:scale-95 cursor-pointer transition-all duration-300 delay-75"
            >
              <MdLogout />
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
