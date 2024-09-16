// backend/server.js
import express, { json } from 'express';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import adminRoutes from './routes/admin.routes.js';
import errorHandler from './middlewares/error.middleware.js';
import cors from 'cors';


const app = express();

// Middleware
app.use(json()); // for parsing application/json
app.use(cors()); // for handling CORS

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

console.log("App.js called");

export default app;
