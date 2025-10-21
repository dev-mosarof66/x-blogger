import { createSlice } from '@reduxjs/toolkit'

const adminBlogs = createSlice({
    name: "admin-blogs",
    initialState: {
        blogs: []
    },
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload
        }
    }
})

export const { setBlogs } = adminBlogs.actions
export default adminBlogs.reducer