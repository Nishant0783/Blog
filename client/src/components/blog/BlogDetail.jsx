// src/components/blog/BlogDetail.jsx
const BlogDetail = ({ title, content, author }) => (
    <div className="border p-4 rounded-md">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-4">{content}</p>
        <p className="mt-4 text-sm text-gray-500">By {author}</p>
    </div>
);

export default BlogDetail;
