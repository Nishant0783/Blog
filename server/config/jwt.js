// backend/config/jwt.js
import jwt from 'jsonwebtoken';


const generateToken = (user) => {
    console.log("User is: ", user)
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export { generateToken };
