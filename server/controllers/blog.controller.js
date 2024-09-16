// backend/controllers/blogController.js
import mongoose from 'mongoose';
import { Blog } from '../models/Blog.model.js';
import { responseUtil } from '../utils/responseUtil.js';
import { DashboardStats } from '../models/DashboardStats.model.js';

const createBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const userId = req.user.id; // Assuming req.user has the logged-in user's ID

        // Validate input
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        // Create a new blog post
        const newBlog = new Blog({
            title,
            content, // This will contain HTML content from CKEditor
            tags,
            author: userId,
            status: 'approved', // Default status (you can customize this)
        });

        await newBlog.save();

        // Update the dashboard stats for this user
        let stats = await DashboardStats.findOne({ user: userId });
        
        if (!stats) {
            // If no stats found for the user, create a new one
            stats = new DashboardStats({ user: userId });
        }
        
        // Update approved count
        stats.approvedCount += 1;
        await stats.save();

        res.status(201).json(newBlog);
    } catch (error) {
        console.log("Error in createBlog: ", error);
        res.status(500).json({ message: error.message });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'approved' });
        res.status(200).json(responseUtil(blogs, 'Blogs fetched successfully'));
    } catch (error) {
        res.status(400).json(responseUtil(error.message, 'error'));
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) throw new Error('Blog not found');
        res.status(200).json(responseUtil(blog, 'Blog details fetched successfully'));
    } catch (error) {
        res.status(404).json(responseUtil(error.message, 'error'));
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) throw new Error('Blog not found');
        
        const previousStatus = blog.status; // Get the current status before updating

        // Update the blog with new data
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBlog) throw new Error('Blog not found');
        
        const userId = blog.author; // Assuming blog has the author reference

        // Update the dashboard stats based on status changes
        let stats = await DashboardStats.findOne({ user: userId });
        if (!stats) {
            stats = new DashboardStats({ user: userId });
        }

        // Check if the status has changed
        if (previousStatus !== updatedBlog.status) {
            if (updatedBlog.status === 'approved') {
                stats.approvedCount += 1;
                if (previousStatus === 'rejected') {
                    stats.rejectedCount -= 1;
                }
            } else if (updatedBlog.status === 'rejected') {
                stats.rejectedCount += 1;
                if (previousStatus === 'approved') {
                    stats.approvedCount -= 1;
                }
            }
        }

        await stats.save();

        res.status(200).json(responseUtil('Blog updated successfully'));
    } catch (error) {
        res.status(400).json(responseUtil(error.message, 'error'));
    }
};

const getUserBlogs = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user ID in req.user from middleware
        const blogs = await Blog.find({ author: userId }); // Fetch all blogs regardless of status
        res.status(200).json(responseUtil(blogs, 'User blogs fetched successfully'));
    } catch (error) {
        res.status(400).json(responseUtil(error.message, 'error'));
    }
};

export { createBlog, getBlogs, getBlogById, updateBlog, getUserBlogs };
