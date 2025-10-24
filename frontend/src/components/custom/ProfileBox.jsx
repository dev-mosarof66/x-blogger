import React from "react";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileBox = ({ user, onClick }) => {
  // Fallback for initials
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");
  const location = useLocation()
  const navigate = useNavigate()

  const isPublic = location.pathname === '/' ? true : location.pathname.includes('/blog') ? true : location.pathname === '/news-letter' ? true : false;

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center cursor-pointer"
    >
      {user ? (
        user?.avatar?.url ? (
          <img
            src={user.avatar.url}
            alt={`${user.name || "User"} Avatar`}
            className="w-7 h-7 rounded-full border-2 border-purple-500 object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-lg">
            {getInitial(user.name)}
          </div>
        )
      ) : (
        isPublic ?
          <div onClick={() => navigate('/login')} className="w-7 h-7 rounded-full bg-purple-500 hover:bg-purple-700 active:scale-95 flex items-center justify-center text-white font-semibold  transition duration-300 delay-75">
            <FaUser size={16} />
          </div> : <div className="p-1 rounded-full border border-purple-700 bg-gray-300 dark:bg-gray-800 animate-pulse" />
      )}
    </div>
  );
};

export default ProfileBox;
