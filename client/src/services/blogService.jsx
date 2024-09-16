// client/src/services/blogService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/blogs/';

// Create new blog
const createBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, blogData, config);
    return response.data;
};

// Get all blogs
const getBlogs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get user blogs
const getUserBlogs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + 'user', config);
    return response.data;
};

// Update a blog
const updateBlog = async (blogId, blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + blogId, blogData, config);
    return response.data;
};

// Delete a blog
const deleteBlog = async (blogId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + blogId, config);
    return response.data;
};

// Get a single blog
const getBlog = async (blogId) => {
    const response = await axios.get(API_URL + blogId);
    return response.data;
};

// Submit blog for approval
const submitForApproval = async (blogId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + blogId + '/submit', {}, config);
    return response.data;
};

// Get admin comments
const getAdminComments = async (blogId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + blogId + '/comments', config);
    return response.data;
};

const blogService = {
    createBlog,
    getBlogs,
    getUserBlogs,
    updateBlog,
    deleteBlog,
    getBlog,
    submitForApproval,
    getAdminComments,
};

export default blogService;