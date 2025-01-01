// utils/jwtUtils.js
import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
    return jwt.sign(
        { 
            id: userId,
            role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};