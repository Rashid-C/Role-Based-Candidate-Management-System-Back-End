import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import uploadS3 from "../config/s3Config.js";
import {
  getCandidateProfile,
  updateProfilePicture,
  updateResume,
} from "../controllers/candidateController.js";

const router = express.Router();

router.use(protect);

router.get("/profile", getCandidateProfile);

router.post(
  "/profile/picture",
  uploadS3.single("profilePicture"),
  updateProfilePicture
);

router.post("/profile/resume", uploadS3.single("resume"), updateResume);

export default router;
