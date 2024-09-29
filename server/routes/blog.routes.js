// backend/routes/blogRoutes.js
import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, getUserBlogs } from '../controllers/blog.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { upload } from './../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/create', authenticate,  upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), createBlog);
router.get('/get-blogs', getBlogs);
router.get('/user', authenticate, getUserBlogs);
router.get('/:id', getBlogById);
router.put('/:id', authenticate, updateBlog);

export default router;
