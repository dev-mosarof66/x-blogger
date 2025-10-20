/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaTags,
    FaListAlt,
    FaPlusCircle,
} from "react-icons/fa";
import { MdHome, MdArticle, MdPeople, MdLogout, MdSettings } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
    {
        id: 1,
        name: "Home",
        path: "/admin",
        icon: () => <MdHome size={22} />,
    },
    {
        id: 2,
        name: "Manage Blogs",
        icon: () => <MdArticle size={22} />,
        sub: [
            {
                id: 1,
                name: "All Blogs",
                path: "/admin/blogs/all",
                icon: () => <FaListAlt size={20} />,
            },
            {
                id: 2,
                name: "Create Blog",
                path: "/admin/blogs/create",
                icon: () => <FaPlusCircle size={20} />,
            },
        ],
    },
    {
        id: 3,
        name: "Manage Users",
        path: "/admin/users",
        icon: () => <MdPeople size={24} />,
    },
    {
        id: 4,
        name: "Manage Tags",
        path: "/admin/tags",
        icon: () => <FaTags size={24} />,
    },
    {
        id: 5,
        name: "Settings",
        path: "/admin/settings",
        icon: () => <MdSettings size={24} />,
    },
];

const AdminSidebar = () => {
    const [openSub, setOpenSub] = useState(null);
    const [activePath, setActivePath] = useState("");
    const location = useLocation();
    const navigate = useNavigate()

    const toggleSub = (id) => {
        setOpenSub(openSub === id ? null : id);
    };

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    // ✅ FIXED FUNCTION
    const isActive = (path, exact = false) => {
        if (exact) return activePath === path;
        return activePath === path || activePath.startsWith(`${path}/`);
    };

    const handleNavigation = (item) => {
        if (item.sub) {
            toggleSub(item.id);
            return;
        }
        setActivePath(item.path);
        navigate(item.path)
    }

    return (
        <div className="hidden md:flex flex-col w-64 h-screen justify-between bg-gray-50 dark:bg-gray-900 border-r border-purple-800 text-black dark:text-white p-4 shadow-xl">
            <div className="w-full flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Admin Panel</h2>

                <ul className="flex flex-col gap-2">
                    {items.map((item) => (
                        <li key={item.id}>
                            <div
                                onClick={() => handleNavigation(item)}
                                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 delay-75
                               ${isActive(item.path, item.id === 1)
                                        ? "bg-purple-800/40"
                                        : "hover:bg-purple-800/20"}`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon()}
                                    <span>{item.name}</span>
                                </div>
                                {item.sub && (
                                    <span className="text-gray-400">
                                        {openSub === item.id ? "−" : "+"}
                                    </span>
                                )}
                            </div>

                            {/* Submenu animation */}
                            <AnimatePresence>
                                {item.sub && openSub === item.id && (
                                    <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="ml-4 flex flex-col gap-2 py-2"
                                    >
                                        {item.sub.map((subItem) => (
                                            <li
                                                key={subItem.id}
                                                onClick={() => {
                                                    setActivePath(subItem.path);
                                                    navigate(subItem.path)
                                                }}
                                                className={`flex items-center gap-2 w-full px-2 py-1 rounded-md text-sm cursor-pointer transition-all duration-300 delay-75
                                               ${isActive(subItem.path)
                                                        ? "bg-purple-800/40 text-white"
                                                        : "hover:bg-purple-800/20 text-gray-300"}`}
                                            >
                                                {subItem.icon()}
                                                {subItem.name}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full flex items-center gap-2 p-2 bg-purple-700 rounded-md hover:bg-purple-600 active:scale-95 cursor-pointer transition-all duration-300 delay-75 text-white">
                <MdLogout size={22} />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default AdminSidebar;
