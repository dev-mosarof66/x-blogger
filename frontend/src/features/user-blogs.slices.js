import { createSlice } from '@reduxjs/toolkit'

const userBlogs = createSlice({
    name: "user-blogs",
    initialState: {
        blogs: []
    },
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload
        }
    }
})

export const { setBlogs } = userBlogs.actions
export default userBlogs.reducer