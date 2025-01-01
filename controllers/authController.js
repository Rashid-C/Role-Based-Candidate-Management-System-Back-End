// controllers/authController.js
import Admin from '../models/Admin.js';
import Candidate from '../models/Candidate.js';
import { generateToken } from '../utils/jwtUtils.js';

// Admin login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(admin._id, 'admin');

        // Set cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            success: true,
            data: {
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                fullName: admin.fullName,
                role: 'admin',
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Candidate login
export const candidateLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const candidate = await Candidate.findOne({ email });
        if (!candidate || !(await candidate.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (!candidate.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Your account has been deactivated'
            });
        }

        // Generate token
        const token = generateToken(candidate._id, 'candidate');

        // Set cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            success: true,
            data: {
                _id: candidate._id,
                username: candidate.username,
                email: candidate.email,
                fullName: candidate.fullName,
                role: 'candidate',
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('access_token');
        
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};