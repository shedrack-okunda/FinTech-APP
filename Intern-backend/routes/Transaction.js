import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createTransaction,
  getPaginatedTransactionsByUser,
  getTransactionsByUser,
  getTransactionsByUserId,
  updateTransactionStatus,
} from "../controllers/Transaction.js";

const router = express.Router();

router
  .post("/", createTransaction)
  .get("/:id", getTransactionsByUserId)
  .get("/user", getTransactionsByUser)
  .get("/user/paginated", getPaginatedTransactionsByUser)
  .patch("/:id/status", updateTransactionStatus);

export default router;
