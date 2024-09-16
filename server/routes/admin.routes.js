// backend/routes/adminRoutes.js
import express from 'express';
import { getBlogsByStatus, handleAdminAction, revertAdminAction } from '../controllers/admin.controller.js';
import { authenticateAdmin } from '../middlewares/adminAuth.middleware.js';

const router = express.Router();

// Middleware to ensure the request is made by an admin
router.use(authenticateAdmin);

router.get('/blogs/:status', getBlogsByStatus);
router.post('/action', handleAdminAction);
router.post('/revert', revertAdminAction);

export default router;
