import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './features/theme.slices'
import userReducer from './features/user.slices'
import adminReducer from './features/admin.slices'
import adminStatsReducer from './features/admin-stats.slices'
import adminBlogReducer from './features/admin-blog.slices'
import tagReducer from './features/tags.slices'
import blogReducer from './features/blogs.slices'


const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        admin: adminReducer,
        adminStats: adminStatsReducer,
        adminBlogs: adminBlogReducer,
        tags: tagReducer,
        blogs: blogReducer
    }
})

export default store