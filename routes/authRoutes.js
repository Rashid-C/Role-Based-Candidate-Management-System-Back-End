import express from 'express';

import {protect} from '../middleware/authMiddleware.js'
import { adminLogin, candidateLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/admin/login', adminLogin);
router.post('/candidate/login', candidateLogin);


export default router;