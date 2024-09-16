import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../features/blog/blogSlice';
import { fetchDashboardStats } from '../features/dashboard/dashboardSlice'; // Import the action
import BlogList from '../components/blog/BlogList';
import DashboardStats from '../components/dashboard/DashboardStats';

const DashboardPage = () => {   
    const dispatch = useDispatch();
    const { blogs, status, error } = useSelector((state) => state.blogs);
    const { approvedCount, rejectedCount, status: statsStatus } = useSelector((state) => state.dashboardStats);

    useEffect(() => {
        dispatch(fetchBlogs('user')); // Fetch user's blogs regardless of status
        dispatch(fetchDashboardStats()); // Dispatch the action to fetch the dashboard stats
    }, [dispatch]);

    if (status === 'loading' || statsStatus === 'loading') {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (status === 'failed' || statsStatus === 'failed') {
        return <div className="text-center p-4 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <DashboardStats approvedCount={approvedCount} rejectedCount={rejectedCount} />
            <BlogList blogs={blogs} />
        </div>
    );
};

export default DashboardPage;
