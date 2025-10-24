import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name:"blogs",
    initialState:{
        trendingBlogs: [],
        blogs: []
    },
    reducers:{
        setBlogs : (state,action)=>{
            state.blogs = action.payload
        },
        setTrendingBlogs : (state,action)=>{
            state.trendingBlogs = action.payload
        },
    }
});

export const {setBlogs,setTrendingBlogs}= blogSlice.actions;
export default blogSlice.reducer