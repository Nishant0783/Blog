// backend/routes/blogRoutes.js
import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, getUserBlogs } from '../controllers/blog.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', authenticate, createBlog);
router.get('/get-blogs', getBlogs);
router.get('/user', authenticate, getUserBlogs);
router.get('/:id', getBlogById);
router.put('/:id', authenticate, updateBlog);

export default router;
