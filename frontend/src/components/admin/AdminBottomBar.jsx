import {
    FaTags,
    FaListAlt,
    FaPlusCircle,
} from "react-icons/fa";
import {
    MdHome,
    MdListAlt,
    MdPeople,
    MdSettings,
} from "react-icons/md";
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
        path: "/admin/blogs/all",
        icon: () => <MdListAlt size={22} />,
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

const AdminBottomBar = () => {
    const location = useLocation();
    const activePath = location.pathname;
    const navigate = useNavigate()

    const isActive = (path, exact = false) => {
        if (exact) return activePath === path;
        return activePath === path || activePath.startsWith(`${path}/`);
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around items-center py-2 border-t border-gray-800 z-50">
            {items.slice(0, 5).map((item) => (
                <div
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center text-xs cursor-pointer transition-all duration-300 delay-75
                        ${isActive(item.path, item.id === 1)
                            ? "text-purple-400"
                            : "hover:text-purple-400"}`}
                >
                    {item.icon()}
                    <span className="text-[10px] mt-1">{item.name}</span>
                </div>
            ))}
        </div>
    );
};

export default AdminBottomBar;
