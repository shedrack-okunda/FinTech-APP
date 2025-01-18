import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/Auth.js";
import userRoutes from "./routes/User.js";
import cardRoutes from "./routes/Card.js";
import invoiceRoutes from "./routes/Invoice.js";
import notificationRoutes from "./routes/Notification.js";
import transactionRoutes from "./routes/Transaction.js";
import profileRoutes from "./routes/Profile.js";

const db = process.env.MONGO_URI;

// server init
const app = express();

// database connection
mongoose
  .connect(db, {})
  .then(() => console.log("Connected to db"))
  .catch((error) => console.log("Error:", error));

// middlewares
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// route middleware
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/notifications", notificationRoutes);
app.use("/transactions", transactionRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "running" });
});

app.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
