import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserEdit, FaCog } from "react-icons/fa";

const BottomNav = () => {
  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/home" },
    { name: "Update", icon: <FaUserEdit />, path: "/update-profile" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md flex justify-around items-center py-2 z-50 lg:hidden">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs ${
              isActive
                ? "text-purple-600"
                : "text-gray-600 dark:text-gray-300 hover:text-purple-500"
            }`
          }
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-[10px] mt-1">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
