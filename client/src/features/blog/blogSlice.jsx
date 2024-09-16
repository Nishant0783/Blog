// src/store/slices/blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Fetch all blogs action
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (type = 'all') => {
    const url = type === 'user' ? '/blogs/user' : '/blogs/get-blogs';
    const response = await axios.get(url);
    return response.data.data;
});

// Fetch single blog by ID action
export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id) => {
    const response = await axios.get(`/blogs/${id}`);
    return response.data.data;
});

// Create blog action
export const createBlog = createAsyncThunk('blogs/createBlog', async (blogData, thunkAPI) => {
    try {
        const response = await axios.post('/blogs/create', blogData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to create blog');
    }
});

const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        blog: null, // Add this to hold the single blog data
        stats: { approvedCount: 0, rejectedCount: 0 },
        status: 'idle',
        error: null,
        isSuccess: false,
        isError: false,
        isLoading: false,
        message: '',
    },
    reducers: {
        reset: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch blogs
            .addCase(fetchBlogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Fetch single blog by ID
            .addCase(fetchBlogById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blog = action.payload;
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Create blog
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.error.message;
            });
    },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
