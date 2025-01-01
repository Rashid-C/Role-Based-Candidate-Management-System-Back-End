// routes/adminRoutes.js
import express from 'express';
import { 
    createCandidate, 
    getAllCandidates, 
    deleteCandidate 
} from '../controllers/adminController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all admin routes
router.use(protect, requireAdmin);

// Admin routes for candidate management
router.post('/candidates', createCandidate);
router.get('/candidates', getAllCandidates);
router.delete('/candidates/:candidateId', deleteCandidate); 

export default router;