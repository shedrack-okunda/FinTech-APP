import mongoose from "mongoose";
const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cardNumber: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
