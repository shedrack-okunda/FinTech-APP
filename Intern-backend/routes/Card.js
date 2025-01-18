import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createCard,
  deleteCard,
  getCardsByUser,
  getCardsByUserId,
  updateCard,
} from "../controllers/Card.js";
const router = express();

router
  .post("/", verifyToken, createCard)
  .get("/:id", verifyToken, getCardsByUserId)
  .get("/user/:userId", verifyToken, getCardsByUser)
  .patch("/:id", verifyToken, updateCard)
  .delete("/:id", verifyToken, deleteCard);

export default router;
