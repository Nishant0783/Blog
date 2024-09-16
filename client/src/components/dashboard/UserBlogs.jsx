// src/components/dashboard/UserBlogs.jsx
import BlogCard from '../blog/BlogCard';

const UserBlogs = ({ blogs }) => (
    <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>
        {blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        title={blog.title}
                        summary={blog.content.substring(0, 100) + '...'}
                        author={blog.author}
                        status={blog.status}
                    />
                ))}
            </div>
        ) : (
            <p>No blogs available</p>
        )}
    </div>
);

export default UserBlogs;
