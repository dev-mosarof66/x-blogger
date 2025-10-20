import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTheme } from '../features/theme.slices';

const ThemeProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const theme = media.matches ? "dark" : "light";
        document.documentElement.classList.toggle(theme)
        dispatch(setTheme(theme))

        
        const handleThemeChange = (e) => {
            const theme = e.matches ? "dark" : "light";
            dispatch(setTheme(theme))
            document.documentElement.classList.toggle(theme)
        };
        media.addEventListener("change", handleThemeChange);
        setMounted(true);
        return () => media.removeEventListener("change", handleThemeChange);
    }, [dispatch])

    if (!mounted) {
        return <div className="w-full h-screen bg-gray-200 dark:bg-gray-900" />;
    }
    return children
}

export default ThemeProvider