import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getProfile, updateProfile } from "../controllers/Profile.js";

const router = express.Router();

router.get("/", verifyToken, getProfile).patch("/", verifyToken, updateProfile);

export default router;
