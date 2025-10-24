import React from "react";
import { FaCamera, FaUserPlus, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { setUser } from "../../features/user.slices";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No image selected")
    }
    const formData = new FormData()
    formData.append("file", file)
    console.log(file)
    try {
      const res = await axiosInstance.post(`/user/avatar/${user._id}`, formData, {
        headers: {
          'Content-Type': "multipart/formdata"
        }
      }
      )
      console.log(res.data)
      if (res.data.success) {
        toast.success('Avatar updated successfully.')
        dispatch(setUser(res.data.user))
      }
    } catch (error) {
      console.log("error while updaing the avatar : ", error)
    }
  };


  return (
    <div className="w-full flex flex-col gap-4">
      {/* --- Profile Header --- */}
      <div className="bg-white dark:bg-gray-900 border border-purple-800/20 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-purple-500/10 transition-all duration-300">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500 shadow-md">
            {user ? (
              user?.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt={`${user.name || "User"} Avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                  {getInitial(user.name)}
                </div>
              )
            ) : location.pathname === "/" ? (
              <div
                onClick={() => navigate("/login")}
                className="w-full h-full bg-purple-500 hover:bg-purple-700 active:scale-95 flex items-center justify-center text-white transition duration-300"
              >
                <FaUser size={28} />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse" />
            )}
          </div>

          {/* Upload Button */}
          <label className="absolute bottom-1 right-1 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full cursor-pointer shadow-md transition">
            <FaCamera size={14} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {user?.name || "Guest User"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {user?.email || "No email provided"}
          </p>
          <button
            onClick={() => navigate("/admin")}
            className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md text-sm font-medium shadow-sm cursor-pointer transition-all duration-300 delay-75"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      {/* --- Change Password --- */}
      <div className="bg-white dark:bg-gray-900 border border-purple-800/20 rounded-2xl shadow-md p-6 hover:shadow-purple-500/10 transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Change Password
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold   cursor-pointer transition-all duration-300 delay-75"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* --- Add New Admin --- */}
      <div className="bg-white dark:bg-gray-900 border border-purple-800/20 rounded-md shadow-md p-6 hover:shadow-purple-500/10 cursor-pointer transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FaUserPlus className="text-purple-500" /> Add New Admin
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="New Admin Email"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
          />
          <select className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition">
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition shadow-sm"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
