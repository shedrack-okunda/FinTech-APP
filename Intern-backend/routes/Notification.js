import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createNotification,
  deleteNotification,
  getNotificationsByUser,
  getNotificationsByUserId,
  markNotificationAsRead,
} from "../controllers/Notification.js";

const router = express.Router();

router
  .post("/", verifyToken, createNotification)
  .get("/:id", verifyToken, getNotificationsByUserId)
  .get("/user/:userId", verifyToken, getNotificationsByUser)
  .patch("/:id/read", verifyToken, markNotificationAsRead)
  .delete("/:id", verifyToken, deleteNotification);

export default router;
