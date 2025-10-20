/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTimes, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import ThemeSetter from "./ThemeSetter";

const navItems = [
    { label: "Home", path: "/", auth: false },
    { label: "Blogs", path: "/blogs", auth: false },
    { label: "News Letter", path: "/news-letter" },
];
const proNavItems = [
    { label: "Daily Digest", path: "/digest" },
    { label: "Tips & Tricks", path: "/tips&tricks" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    const location = useLocation()


    if (location.pathname === '/profile') {
        return null
    }


    return (
        <nav className="w-full fixed top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-green-600 text-transparent bg-clip-text"
                >
                    X Blogger
                </Link>

                {/* Desktop nav */}
                <div className="hidden sm:flex items-center gap-6">
                    {navItems.map((nav) => (
                        <NavLink
                            key={nav.path}
                            to={nav.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-300 ${isActive
                                    ? "text-purple-600 dark:text-purple-400"
                                    : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                                } `
                            }
                        >
                            {nav.label}
                        </NavLink>
                    ))}
                    {user && user.isPro && proNavItems.map((nav) => (
                        <NavLink
                            key={nav.path}
                            to={nav.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-300 ${isActive
                                    ? "text-purple-600 dark:text-purple-400"
                                    : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                                } `
                            }
                        >
                            {nav.label}
                        </NavLink>
                    ))}
                </div>

                {/* Desktop buttons */}
                <div className="hidden sm:flex items-center gap-4">
                    {/* Theme Toggle */}
                    <ThemeSetter />

                    {/* User button */}
                    <div
                        className="text-gray-700 dark:text-gray-200 hover:text-red-500 transition duration-300 cursor-pointer delay-75"
                    >
                        {
                            user ?
                                <div onClick={() => navigate('/profile')}>
                                    {
                                        (
                                            user.avatar?.url ? (
                                                <img
                                                    src={user.avatar?.url}
                                                    alt={user.name || "User"}
                                                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500 cursor-pointer"
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        navigate("/profile");
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        navigate("/profile");
                                                    }}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold cursor-pointer"
                                                >
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                            )
                                        )
                                    }
                                </div> :
                                <div onClick={() => navigate('/login')}>

                                    <FaUser
                                        size={20}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            navigate("/login");
                                        }}
                                    />
                                </div>
                        }

                    </div>
                </div>

                {/* Mobile menu toggle */}
                <div
                    onClick={() => setMenuOpen(true)}
                    className="block sm:hidden text-gray-900 dark:text-gray-100 hover:text-purple-600 cursor-pointer transition duration-300"
                >
                    <GiHamburgerMenu size={24} />
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-screen backdrop-blur-sm fixed top-0 right-0 z-40"
                    >
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
                            exit={{ x: "100%", opacity: 0, transition: { duration: 0.5 } }}
                            className="sm:hidden w-60 h-screen bg-purple-100 dark:bg-gray-900 p-5 shadow-lg absolute top-0 right-0"
                        >
                            <div className="w-full h-[80vh] xs:h-full">
                                <div
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full flex justify-end text-gray-900 dark:text-white cursor-pointer hover:text-purple-600 transition"
                                >
                                    <FaTimes size={22} />
                                </div>

                                <div className="flex flex-col justify-between h-[90vh]">
                                    <div className="flex flex-col items-start gap-4 mt-6">
                                        {navItems.map((nav) => (
                                            <NavLink
                                                key={nav.path}
                                                to={nav.path}
                                                onClick={() => setMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `text-sm font-medium transition-colors duration-300 ${isActive
                                                        ? "text-purple-600 dark:text-purple-400"
                                                        : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                                                    } `
                                                }
                                            >
                                                {nav.label}
                                            </NavLink>
                                        ))}
                                        {user && user.isPro && proNavItems.map((nav) => (
                                            <NavLink
                                                key={nav.path}
                                                to={nav.path}
                                                onClick={() => setMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `text-sm font-medium transition-colors duration-300 ${isActive
                                                        ? "text-purple-600 dark:text-purple-400"
                                                        : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                                                    } `
                                                }
                                            >
                                                {nav.label}
                                            </NavLink>
                                        ))}
                                    </div>

                                    <div className="w-full flex items-center gap-4">
                                        {/* Theme Toggle */}
                                        <ThemeSetter />
                                        {/* profile button  */}
                                        <div
                                            className="text-gray-700 dark:text-gray-200 hover:text-red-500 transition duration-300 cursor-pointer delay-75"
                                        >
                                            {
                                                user ?
                                                    <div onClick={() => navigate('/profile')}>
                                                        {
                                                            (
                                                                user.avatar?.url ? (
                                                                    <img
                                                                        src={user.avatar?.url}
                                                                        alt={user.name || "User"}
                                                                        className="w-8 h-8 rounded-full object-cover border-2 border-purple-500 cursor-pointer"
                                                                        onClick={() => {
                                                                            setMenuOpen(false);
                                                                            navigate("/profile");
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <div
                                                                        onClick={() => {
                                                                            setMenuOpen(false);
                                                                            navigate("/profile");
                                                                        }}
                                                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold cursor-pointer"
                                                                    >
                                                                        {user.name?.charAt(0).toUpperCase()}
                                                                    </div>
                                                                )
                                                            )
                                                        }
                                                    </div> :
                                                    <div onClick={() => navigate('/login')}>

                                                        <FaUser
                                                            size={20}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                setMenuOpen(false);
                                                                navigate("/login");
                                                            }}
                                                        />
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </nav>
    );
};

export default Navbar;
