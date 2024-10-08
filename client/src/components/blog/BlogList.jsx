// src/components/blog/BlogList.jsx
import BlogCard from './BlogCard';
import parse from 'html-react-parser';

const BlogList = ({ blogs }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog._id}
                    title={blog.title}
                    summary={parse(blog.content)}
                    status={blog.status}
                    id={blog._id}
                    images={blog.images}
                />
            ))}
        </div>
    )
};

export default BlogList;
