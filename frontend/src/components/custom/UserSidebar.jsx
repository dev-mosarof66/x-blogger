/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaHome, FaUserEdit, FaCog, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeSetter from "./ThemeSetter";

const Sidebar = () => {
    const menuItems = [
        { name: "Home", icon: <FaHome />, path: "/home" },
        { name: "Update Profile", icon: <FaUserEdit />, path: "/update-profile" },
        { name: "Settings", icon: <FaCog />, path: "/settings" },
    ];

    const navigate = useNavigate()

    // Example logout handler (replace with real auth logic)
    const handleLogout = () => {

    };

    return (
        <div className="hidden md:block md:w-60 lg:w-72 h-screen bg-gray-50 border-r border-purple-600 dark:bg-gray-900">
            <div className="w-full h-full flex flex-col justify-between p-4">
                {/* Top Section */}
                <div className="w-full flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1 onClick={()=> navigate('/')} className="text-lg font-semibold text-purple-600 hover:text-purple-700 active:scale-95 cursor-pointer transition-all duration-300 delay-75">X-Blogger</h1>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex flex-col gap-3">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ${isActive
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-purple-200 dark:hover:bg-purple-800"
                                    }`
                                }
                            >
                                <span className="text-lg">{item.icon}</span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.name}
                                </motion.span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col gap-3 border-t border-gray-300 dark:border-gray-700 pt-4">
                    {/* Theme Setter */}
                    <div className="w-full px-3">
                        <ThemeSetter />
                    </div>
                    <div
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 active:scale-95 transition-colors cursor-pointer duration-200 delay-75"
                    >
                        <FaSignOutAlt className="text-lg" />
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
