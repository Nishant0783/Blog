import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from '../components/blog/BlogList.jsx';
import { fetchBlogsByStatus, handleAdminAction } from '../features/admin/adminSlice'; // Correct import
import { createAsyncThunk } from '@reduxjs/toolkit';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { pendingBlogs, approvedBlogs, rejectedBlogs } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchBlogsByStatus('pending'));
        dispatch(fetchBlogsByStatus('approved'));
        dispatch(fetchBlogsByStatus('rejected'));
    }, [dispatch]);

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Admin Dashboard</h1>
            <section className='my-[20px]'>
                <h2 className='mb-[5px]'>Pending Blogs</h2>
                <BlogList blogs={pendingBlogs} />
            </section>
            <section className='my-[20px]'>
                <h2 className='mb-[5px]'>Approved Blogs</h2>
                <BlogList blogs={approvedBlogs} />
            </section>
            <section className='my-[20px]'>
                <h2 className='mb-[5px]'>Rejected Blogs</h2>
                <BlogList blogs={rejectedBlogs} />
            </section>
        </div>
    );
};

export default AdminDashboard;
