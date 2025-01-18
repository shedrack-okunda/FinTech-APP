import express from "express";

import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createInvoice,
  deleteInvoice,
  getInvoicesByUser,
  getInvoicesByUserId,
  updateInvoice,
} from "../controllers/Invoice.js";

const router = express.Router();

router
  .post("/", verifyToken, createInvoice)
  .get("/:id", verifyToken, getInvoicesByUserId)
  .get("/user/:userId", verifyToken, getInvoicesByUser)
  .patch("/:id", verifyToken, updateInvoice)
  .delete("/:id", verifyToken, deleteInvoice);

export default router;
