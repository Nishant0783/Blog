// src/api/axios.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Add token to headers if it exists
        const token = localStorage.getItem('token'); // or cookies if you're using cookies
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or unauthorized, redirect to login
            localStorage.removeItem('token'); // or cookies if you're using cookies
            const navigate = useNavigate();
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

export default api;
