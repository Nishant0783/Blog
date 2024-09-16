// src/components/blog/BlogCard.jsx
const statusColors = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
};

const BlogCard = ({ title, summary, author, status }) => (
    <div className={`p-4 border rounded-md ${statusColors[status]}`}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2">{summary}</p>
        <p className="mt-2 text-sm text-gray-600">By {author}</p>
        <p className="mt-2 text-sm font-semibold">{status.charAt(0).toUpperCase() + status.slice(1)}</p>
    </div>
);

export default BlogCard;
