import { createSlice } from '@reduxjs/toolkit'

const tagSlice = createSlice({
    name: "tags",
    initialState: {
        tags: []
    },
    reducers: {
        setTags: (state, action) => {
            state.tags = action.payload
        }
    }
})

export const { setTags, addTags } = tagSlice.actions;
export default tagSlice.reducer