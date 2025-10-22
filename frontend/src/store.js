import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './features/theme.slices'
import userReducer from './features/user.slices'
import adminReducer from './features/admin.slices'
import adminStatsReducer from './features/admin-stats.slices'
import adminBlogReducer from './features/admin-blog.slices'
import userBlogReducer from './features/user-blogs.slices'

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        admin: adminReducer,
        adminStats: adminStatsReducer,
        adminBlogs: adminBlogReducer,
        userBlogs: userBlogReducer,
    }
})

export default store