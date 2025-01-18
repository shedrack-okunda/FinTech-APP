import Transaction from "../models/Transaction.js";

export const getPaginatedTransactionsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure req.user is set by verifyToken
    const { page = 1, limit = 5 } = req.query; // Default values if not provided

    const skip = (page - 1) * limit; // Calculate documents to skip
    const [transactions, total] = await Promise.all([
      Transaction.find({ user: userId })
        .select("createdAt type amount status")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10)),
      Transaction.countDocuments({ user: userId }),
    ]);

    res.status(200).json({
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transactions.", error });
  }
};

// Create a transaction
export const createTransaction = async (req, res) => {
  try {
    const { user, walletId, type, amount, paymentMethod, description, status } =
      req.body;
    const transaction = new Transaction({
      user,
      walletId,
      type,
      amount,
      paymentMethod,
      description,
      status,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction.", error });
  }
};

// Get transactions by user ID
export const getTransactionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ user: userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transactions.", error });
  }
};

// Get all transactions for a user
export const getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ user: userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transactions.", error });
  }
};

// Update transaction status
export const updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction.", error });
  }
};
