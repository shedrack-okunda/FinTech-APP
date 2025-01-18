import Wallet from "../models/Wallet.js";

// create a new wallet
export const createWallet = async (req, res) => {
  try {
    const { user, balance, currency } = req.body;
    const wallet = new Wallet({ user, balance, currency });
    await wallet.save();
    res.status(201).json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Error creating wallet.", error });
  }
};

// Get wallet by user ID
export const getWalletByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found." });
    }
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving wallet.", error });
  }
};

// Update wallet balance
export const updateWalletBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;
    const wallet = await Wallet.findOneAndUpdate(
      { user: userId },
      { $inc: { balance: amount } },
      { new: true }
    );
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found." });
    }
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Error updating wallet balance.", error });
  }
};

// Delete a wallet
export const deleteWallet = async (req, res) => {
  try {
    const { walletId } = req.params;
    const wallet = await Wallet.findByIdAndDelete(walletId);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found." });
    }
    res.status(200).json({ message: "Wallet deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting wallet.", error });
  }
};
