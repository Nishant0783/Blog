import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Fetch blogs by status (pending, approved, rejected)
export const fetchBlogsByStatus = createAsyncThunk('admin/fetchBlogsByStatus', async (status) => {
    const response = await axios.get(`/admin/blogs/${status}`);
    return { status, data: response.data.data }; // Return status and data for extraReducers
});

export const handleAdminAction = createAsyncThunk('admin/handleAdminAction', async ({ blogId, action, comments }) => {
    const response = await axios.post('/admin/action', { blogId, action, comments });
    return response.data;
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: { pendingBlogs: [], approvedBlogs: [], rejectedBlogs: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogsByStatus.fulfilled, (state, action) => {
                state[`${action.payload.status}Blogs`] = action.payload.data; // Use status from payload to update the correct list
            })
            .addCase(handleAdminAction.fulfilled, (state, action) => {
                // Handle action logic here, e.g., updating blog status in the lists
            });
    }
});

export default adminSlice.reducer;
