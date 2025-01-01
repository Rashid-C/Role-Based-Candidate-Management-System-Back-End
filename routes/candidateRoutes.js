// routes/candidateRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import uploadS3 from '../config/s3Config.js';
import {
    getCandidateProfile,
    updateProfilePicture,
    updateResume
} from '../controllers/candidateController.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Profile routes
router.get('/profile', getCandidateProfile);

// File upload routes
router.post(
    '/profile/picture',
    uploadS3.single('profilePicture'),
    updateProfilePicture
);

router.post(
    '/profile/resume',
    uploadS3.single('resume'),
    updateResume
);

export default router;