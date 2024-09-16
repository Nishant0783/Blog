// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

const authenticateAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (user.email !== 'adminmail@admin.com') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export { authenticateAdmin }
