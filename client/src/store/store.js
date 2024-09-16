// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import blogReducer from '../features/blog/blogSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer,
        dashboardStats: dashboardReducer
    },
});

export default store;
