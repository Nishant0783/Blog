import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    status: { type: String, default: 'pending' }, // 'pending', 'approved', 'rejected'
    adminComments: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Blog = mongoose.model('Blog', blogSchema);
