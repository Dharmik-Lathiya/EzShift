const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  amount: { type: Number, required: true },
  commission: { type: Number, required: true },
  workerAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  payoutStatus: { type: String, enum: ["Pending", "Released"], default: "Pending" },
  payuTxnId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);