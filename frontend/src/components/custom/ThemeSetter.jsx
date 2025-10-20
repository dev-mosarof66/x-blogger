import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../features/theme.slices';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeSetter = () => {
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch()
    const toggleTheme = () => {
        if (theme === "dark") {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            dispatch(setTheme("light"));
        } else {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            dispatch(setTheme("dark"));
        }
    };
    return (
        <div
            onClick={toggleTheme}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 cursor-pointer transition duration-300 delay-75"
        >
            {theme === "light" ? (
                <MdDarkMode size={24} />
            ) : (
                <MdLightMode size={24} />
            )}
        </div>
    )
}

export default ThemeSetter