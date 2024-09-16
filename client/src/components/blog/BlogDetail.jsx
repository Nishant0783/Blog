// src/pages/BlogDetail.jsx
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById } from '../../features/blog/blogSlice';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';

const BlogDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { blog, status, error } = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchBlogById(id));
    }, [dispatch, id]);

    if (status === 'loading') return <div className="text-center py-4">Loading...</div>;
    if (status === 'failed') {
        toast.error(error);
        return <div className="text-center py-4 text-red-600">Error: {error}</div>;
    }

    if (!blog) return <div className="text-center py-4">No blog found</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
                <p className="text-gray-600 mb-4">{blog.authorName}</p>
                <div className="text-gray-700 leading-relaxed">
                    <p>{parse(blog.content)}</p>
                </div> 
            </div>
            <div className="text-center">
                <Link to="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Back to Blogs</Link>
            </div>
        </div>
    );
};

export default BlogDetail;
