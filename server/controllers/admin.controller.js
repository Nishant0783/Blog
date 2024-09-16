// backend/controllers/adminController.js
import { Blog } from '../models/Blog.model.js';
import { responseUtil } from '../utils/responseUtil.js';

// Get blogs by status
const getBlogsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const blogs = await Blog.find({ status }).sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json(responseUtil(blogs, 'Blogs fetched successfully'));
    } catch (error) {
        res.status(400).json(responseUtil(error.message, 'error'));
    }
};

// Handle admin actions (approve/reject)
const handleAdminAction = async (req, res) => {
    try {
        const { blogId, action, comments } = req.body;
        const blog = await Blog.findById(blogId);

        if (!blog) throw new Error('Blog not found');

        if (action === 'approved') {
            blog.status = 'approved';
        } else if (action === 'rejected') {
            blog.status = 'rejected';
            blog.rejectionComments = comments; // Store rejection comments
        }

        await blog.save();
        res.status(200).json(responseUtil('Action performed successfully'));
    } catch (error) {
        res.status(400).json(responseUtil(error.message, 'error'));
    }
};

// Revert admin actions (move back to pending)
const revertAdminAction = async (req, res) => {
    try {
        const { blogId } = req.body;
        const blog = await Blog.findById(blogId);

        if (!blog) throw new Error('Blog not found');

        blog.status = 'pending';
        blog.rejectionComments = '';
        await blog.save();
        res.status(200).json(responseUtil('Action reverted successfully'));
    } catch (error) {
        res.status(400).json(responseUtil(error.message, 'error'));
    }
};

export { getBlogsByStatus, handleAdminAction, revertAdminAction };
