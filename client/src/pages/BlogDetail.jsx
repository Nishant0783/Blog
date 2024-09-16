// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/blogs/${id}`);
                setBlog(response.data.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch blog');
            }
        };

        fetchBlog();
    }, [id]);

    if (error) {
        toast.error(error);
        return <div>Error: {error}</div>;
    }

    if (!blog) return <div>Loading...</div>;

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    );
};

export default BlogDetail;
