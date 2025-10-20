import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './features/theme.slices'
import userReducer from './features/user.slices'
import adminReducer from './features/admin.slices'

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        admin: adminReducer
    }
})

export default store