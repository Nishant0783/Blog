// client/src/services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/users/';

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const signup = async (userData) => {
    const response = await axios.post(API_URL + 'signup', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    login,
    signup,
    logout,
};

export default authService;