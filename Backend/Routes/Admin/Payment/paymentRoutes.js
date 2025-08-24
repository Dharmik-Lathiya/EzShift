const express = require("express");
const router = express.Router();
const Transaction = require("../../../Models/TransactionSchema");
const Worker = require("../../../Models/WorkerSchema");

// Route to get all transactions (for admin review)
router.get("/transactions", async (req, res) => {
  try {
    const { payoutStatus } = req.query; // Allow filtering by payoutStatus
    let query = {};
    if (payoutStatus) {
      query.payoutStatus = payoutStatus;
    }

    const transactions = await Transaction.find(query)
      .populate("tripId")
      .populate("clientId")
      .populate("workerId");

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Route to release payment to a worker
router.post("/release/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    if (transaction.payoutStatus === "Released") {
      return res.status(400).json({ success: false, message: "Payment already released for this transaction." });
    }

    // Update transaction payout status
    transaction.payoutStatus = "Released";
    await transaction.save();

    // Update worker's earning
    const worker = await Worker.findById(transaction.workerId);
    if (worker) {
      worker.earning += transaction.workerAmount;
      await worker.save();
    } else {
      console.warn(`Worker with ID ${transaction.workerId} not found for transaction ${transactionId}. Earning not updated.`);
    }

    res.status(200).json({ success: true, message: "Payment released successfully", data: transaction });
  } catch (error) {
    console.error("Error releasing payment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
