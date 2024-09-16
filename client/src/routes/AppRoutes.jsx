// src/routes/AppRoutes.js
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import BlogDetail from './../components/blog/BlogDetail';
import EditBlog from './../pages/EditBlog';
import CreateBlog from '../pages/CreateBlog';
import AdminDashboard from '../pages/AdminDashboard';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '', element: <HomePage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },
            { path: '/admin', element: <AdminDashboard />},
            {
                path: '/createblog',
                element: (
                    <PrivateRoute>
                        <CreateBlog />
                    </PrivateRoute>
                ),
            },
            { path: '/blog/:id', element: <BlogDetail /> },
            { path: '/blog/edit/:id', element: <EditBlog /> },
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);


export default router;
