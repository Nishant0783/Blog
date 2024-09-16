// src/components/blog/BlogList.jsx
import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => (
    <div className="grid grid-cols-1 gap-4">
        {blogs.map((blog) => (
            <BlogCard
                key={blog._id}
                title={blog.title}
                summary={blog.summary}
                author={blog.author}
                status={blog.status}
            />
        ))}
    </div>
);

export default BlogList;
