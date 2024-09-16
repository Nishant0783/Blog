// backend/routes/dashboardRoutes.js
import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route to get dashboard statistics
router.get('/stats', authenticate, getDashboardStats);


export default router;
