import { createSlice } from "@reduxjs/toolkit";

const adminStats = createSlice({
    name: 'admin-stats',
    initialState: {
        stats: null
    },
    reducers: {
        setStats: (state, action) => {
            state.stats = action.payload
        }
    }
})

export const {setStats} = adminStats.actions;
export default adminStats.reducer