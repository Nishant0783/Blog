// src/components/blog/BlogCard.jsx
import { Link } from 'react-router-dom';
const statusColors = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
};

const BlogCard = ({ title, summary, status, id }) => {
    console.log("Blog content: ", summary)
    return (
    <div className={`p-4 border rounded-md ${statusColors[status]}`}>
        <Link to={`/blog/${id}`} className="text-blue-600 hover:underline">
            {title}
        </Link>
        <p className="mt-2">{`${summary.substring(0, 100)} ...`}</p>
        <p className="mt-2 text-sm font-semibold">{status.charAt(0).toUpperCase() + status.slice(1)}</p>
    </div>
    )
};

export default BlogCard;
