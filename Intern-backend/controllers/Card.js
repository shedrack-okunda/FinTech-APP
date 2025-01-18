import Card from "../models/Card.js";

// Create a new card
export const createCard = async (req, res) => {
  try {
    const { user, cardNumber, cardHolderName, expiryDate, cvv } = req.body;
    const card = new Card({
      user,
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv,
    });
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: "Error creating card.", error });
  }
};

// Get cards by user ID
export const getCardsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cards = await Card.find({ user: userId });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cards.", error });
  }
};

// Delete a card
export const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }
    res.status(200).json({ message: "Card deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting card.", error });
  }
};

// Get all cards for a user
export const getCardsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cards = await Card.find({ user: userId });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cards.", error });
  }
};

// Update a card
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const card = await Card.findByIdAndUpdate(id, updates, { new: true });
    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: "Error updating card.", error });
  }
};
