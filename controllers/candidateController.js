// controllers/candidateController.js
import Candidate from '../models/Candidate.js';

// Get candidate profile
export const getCandidateProfile = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.user._id)
            .select('-password')
            .populate('createdBy', 'username email');

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        res.json({
            success: true,
            data: candidate
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update profile picture
export const updateProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const candidate = await Candidate.findById(req.user._id);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        // Update profile picture URL
        candidate.profilePicture = req.file.location;
        await candidate.save();

        res.json({
            success: true,
            data: {
                profilePicture: candidate.profilePicture
            }
        });
    } catch (error) {
        console.error('Profile picture upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update resume
export const updateResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const candidate = await Candidate.findById(req.user._id);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        // Update resume URL
        candidate.resume = req.file.location;
        await candidate.save();

        res.json({
            success: true,
            data: {
                resume: candidate.resume
            }
        });
    } catch (error) {
        console.error('Resume upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};