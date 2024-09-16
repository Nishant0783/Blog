// src/components/blog/BlogList.jsx
import BlogCard from './BlogCard';
import parse from 'html-react-parser';

const BlogList = ({ blogs }) => {
    console.log("Blogs are: ", blogs);
    return (
        <div className="grid grid-cols-1 gap-4">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog._id}
                    title={blog.title}
                    summary={(parse(blog.content)).substring(0, 100)}
                    status={blog.status}
                    id={blog._id}
                />
            ))}
        </div>
    )
};

export default BlogList;
 