// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Create async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    console.log(response)
    localStorage.setItem('token', response.data.data.token); // Store token in local storage
    return response.data;
});

// Create async thunk for signup
export const signup = createAsyncThunk('auth/signup', async (credentials) => {
    const response = await axios.post('/auth/register', credentials);
    return response.data;
});

// Create async thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token'); // Remove token from local storage
    return {};
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: !!localStorage.getItem('token'),
        isLoading: false,
        isError: false,
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export default authSlice.reducer;
