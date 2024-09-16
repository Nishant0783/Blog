// src/store/slices/dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Fetch dashboard stats action
export const fetchDashboardStats = createAsyncThunk('dashboard/fetchStats', async () => {
    console.log("dashoibar called")
    const response = await axios.get('/dashboard/stats');
    console.log("repone of dahboard: ", response)
    return response.data.data;
});

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: { approvedCount: 0, rejectedCount: 0, status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.approvedCount = action.payload.approvedCount;
                state.rejectedCount = action.payload.rejectedCount;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default dashboardSlice.reducer;
