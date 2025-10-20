import React, { useState } from "react";
import { FaCamera, FaUserPlus } from "react-icons/fa";

const Profile = () => {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/100?img=8");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <div className="w-full h-full p-6 space-y-8">
      {/* --- Admin Info Card --- */}
      <div className="bg-white dark:bg-gray-900 border border-purple-800/40 rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={avatar}
            alt="Admin Avatar"
            className="w-24 h-24 rounded-full border border-purple-500 object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition">
            <FaCamera />
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">John Doe</h2>
          <p className="text-gray-600 dark:text-gray-300">admin@example.com</p>
        </div>
      </div>

      {/* --- Password Change --- */}
      <div className="bg-white dark:bg-gray-900 border border-purple-800/40 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Change Password
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* --- Add More Admin --- */}
      <div className="bg-white dark:bg-gray-900 border border-purple-800/40 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <FaUserPlus /> Add New Admin
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="New Admin Email"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          />
          <select className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
