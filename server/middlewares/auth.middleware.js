// backend/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token is: ", token)
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        console.log("inside try")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("decoded is: ", decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.log("Error in middleware: ", error)
        res.status(401).json({ message: 'Invalid token' });
    }
};

export { authenticate };
