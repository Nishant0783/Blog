// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        // Wait for the password hashing to complete
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err); // If error occurs, pass it to next middleware
    }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
