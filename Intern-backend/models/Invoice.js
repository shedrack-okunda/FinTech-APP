import mongoose from "mongoose";
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
  invoiceNumber: { type: String, unique: true, required: true },
  amount: { type: Number, required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["paid", "unpaid", "overdue"],
    default: "unpaid",
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
