// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from '../components/blog/BlogList';
import { fetchBlogs } from '../features/blog/blogSlice';

const HomePage = () => {
    const dispatch = useDispatch();
    const { blogs, status, error } = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchBlogs()); // Fetch all approved blogs
    }, [dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    // Filter out only approved blogs for the home page
    const approvedBlogs = blogs.filter(blog => blog.status === 'approved');

    return (
        <div>
            <BlogList blogs={approvedBlogs} />
        </div>
    );
};

export default HomePage;
