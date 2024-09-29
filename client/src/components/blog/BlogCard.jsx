// src/components/blog/BlogCard.jsx
import { Link } from 'react-router-dom';
const statusColors = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
};

const BlogCard = ({ title, summary, status, id, images }) => {
    return (
        <div className={`p-4 border rounded-md ${statusColors[status]}`}>
            <div className='flex flex-row gap-x-[50px]'>
                <Link to={`/blog/${id}`} className="text-blue-600 hover:underline">
                    {title}
                </Link>
                {images && images.length > 0 && (
                    <div className='flex flex-row gap-x-[20px]'>

                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={`data:image/png;base64,${image}`}
                                alt={`Blog Image ${index + 1}`}
                                style={{ width: '100px', height: '100px', marginTop: '20px' }}
                            />
                        ))}
                    
                    </div>
                    )}
            </div>

            <p className="mt-2">{summary}</p>
            <p className="mt-2 text-sm font-semibold">{status}</p>
        </div>
    )
};

export default BlogCard;
