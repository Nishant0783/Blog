// src/components/blog/BlogForm.jsx
import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import axios from '../../api/axios';

const BlogForm = () => {
    const [formData, setFormData] = useState({ title: '', content: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/blogs', formData);
            // Handle success
        } catch (error) {
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Blog Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Blog Content"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm"
            ></textarea>
            <Button type="submit">Create Blog</Button>
        </form>
    );
};

export default BlogForm;
