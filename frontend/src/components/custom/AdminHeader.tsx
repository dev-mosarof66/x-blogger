import { useState } from "react";
import { MdLogout, MdPerson } from "react-icons/md";
import ThemeSetter from "./ThemeSetter";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("admin logout clicked.");
  };
  return (
    <div className="w-full flex justify-end gap-4 items-center px-0 sm:px-4 border-b border-purple-600/20 pb-1">
      {/* Theme Switch */}
      <ThemeSetter />

      {/* Profile */}
      <div className="relative">
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/40?img=8"
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full border border-purple-500"
          />
        </div>

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
