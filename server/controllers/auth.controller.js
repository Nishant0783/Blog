// backend/controllers/authController.js
import { User } from '../models/User.model.js';
import { generateToken } from '../config/jwt.js';
import { responseUtil } from '../utils/responseUtil.js';

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({
            username,
            email,
            password
        })

        const createdUser = await User.findById(user._id).select("-password");
        
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user.")
        }

        res.status(201).json(responseUtil('User registered successfully'));
    } catch (error) {
        res.status(400).json(responseUtil(error.message, 'error'));
    }
};

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("Username: ", username, " password: ", password)
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Invalid credentials');
        }
        const token = generateToken(user);
        console.log("Generated token: ", token)
        res.status(200).json(responseUtil({ token }, 'Login successful'));
    } catch (error) {
        console.log("Error in login: ", error.message)
        res.status(401).json(responseUtil(error.message, 'error'));
    }
};


export { register, login };