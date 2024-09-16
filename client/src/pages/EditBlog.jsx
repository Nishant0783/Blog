// src/pages/EditBlog.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!blog.title.trim() || !blog.content.trim()) {
            setError('Title and content are required.');
            toast.error('Title and content are required.');
            return;
        }

        setLoading(true);
        try {
            await api.put(`/blogs/${id}`, blog);
            toast.success('Blog updated successfully');
            navigate(`/blogs/${id}`);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update blog');
            toast.error(error.response?.data?.message || 'Failed to update blog');
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={blog.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Content:
                <textarea
                    name="content"
                    value={blog.content}
                    onChange={handleChange}
                    required
                />
            </label>
            {error && <div className="text-red-500">{error}</div>}
            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
            </button>
        </form>
    );
};

export default EditBlog;
