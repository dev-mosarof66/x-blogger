import { useState } from "react";
import { MdLogout, MdPerson } from "react-icons/md";
import ThemeSetter from "../custom/ThemeSetter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileBox from "../custom/ProfileBox";

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  console.log(user);

  const handleLogout = async () => {
    console.log("admin logout clicked.");
  };
  return (
    <div className="w-full flex justify-end gap-4 items-center px-0 sm:px-4 border-b border-purple-600/20 pb-1">
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
