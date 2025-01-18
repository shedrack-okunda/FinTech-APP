import Invoice from "../models/Invoice.js";

// Create an invoice
export const createInvoice = async (req, res) => {
  try {
    const {
      user,
      transactionId,
      invoiceNumber,
      amount,
      issueDate,
      dueDate,
      status,
    } = req.body;
    const invoice = new Invoice({
      user,
      transactionId,
      invoiceNumber,
      amount,
      issueDate,
      dueDate,
      status,
    });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error creating invoice.", error });
  }
};

// Get invoices by user ID
export const getInvoicesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const invoices = await Invoice.find({ user: userId });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving invoices.", error });
  }
};

// Delete an invoice
export const deleteInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await Invoice.findByIdAndDelete(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }
    res.status(200).json({ message: "Invoice deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting invoice.", error });
  }
};

// Get all invoices for a user
export const getInvoicesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const invoices = await Invoice.find({ user: userId });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving invoices.", error });
  }
};

// Update an invoice
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const invoice = await Invoice.findByIdAndUpdate(id, updates, { new: true });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error updating invoice.", error });
  }
};
