// routes/adminRoutes.js
import express from "express";
import {
  createCandidate,
  getAllCandidates,
  deleteCandidate,
} from "../controllers/adminController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, requireAdmin);

router.post("/candidates", createCandidate);
router.get("/candidates", getAllCandidates);
router.delete("/candidates/:candidateId", deleteCandidate);

export default router;
