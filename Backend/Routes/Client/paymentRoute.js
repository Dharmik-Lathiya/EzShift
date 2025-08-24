const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Trip = require("../../Models/TripSchema");
const Transaction = require("../../Models/TransactionSchema"); // Import Transaction model
const Admin = require("../../Models/AdminSchema"); // Import Admin model
const Vehicle = require("../../Models/VechialSchema");
const log = require("node-dev/lib/log");


const MERCHANT_KEY = "Wzipov";
const MERCHANT_SALT = "o5gtUwZoz0SsfzlP79QZ1iiMW756hIYB";

// ✅ PayU success callback
router.post("/success", async (req, res) => {
    try {
    console.log("PayU Callback received. Body:", req.body);
    const { txnid, amount, status, productinfo, email, firstname, key, hash } = req.body;

    const hashString = `${MERCHANT_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${MERCHANT_KEY}`;
    const calculatedHash = crypto.createHash("sha512").update(hashString).digest("hex");

    if (hash !== calculatedHash) {
      console.log("❌ Invalid Hash in PayU callback");
      return res.status(400).send("Invalid Hash");
    }

    const trip = await Trip.findOne({ paymentRef: txnid }).populate("clientId").populate("workers").populate("vehicleId");
    if (!trip) {
        return res.status(404).send("Trip not found");
    }

    if (status === "success") {
      const commissionRate = 0.10;
      const commission = amount * commissionRate;
      const workerAmount = amount - commission;

      console.log("PayU Callback:", workerAmount, commission);

      let admin = await Admin.findOne();
      if (!admin) {
        admin = new Admin();
        await admin.save();
      }

      const newTransaction = new Transaction({
        tripId: trip._id,
        clientId: trip.clientId._id,
        workerId: trip.workers[0] ? trip.workers[0]._id : null,
        amount,
        commission,
        workerAmount,
        paymentStatus: "Completed",
        payuTxnId: txnid,
      });
      await newTransaction.save();

      trip.isPaid = true;
      trip.status = "Paid";
      trip.paymentRef = txnid;
      trip.transactionId = newTransaction._id;
      await trip.save();

      admin.walletBalance += commission;
      await admin.save();

      const vehicle = await Vehicle.findById(trip.vehicleId);
      if (vehicle) {
        vehicle.status = "Active";
        await vehicle.save();
      }

      console.log("✅ Payment Success:", txnid);
     return res.redirect(`http://localhost:5173/client/history?payment=success&txnid=${txnid}`);
    } else {
      console.log("❌ Payment Failed:", txnid);
      return res.redirect(`http://localhost:5173/client/history?payment=failure&txnid=${txnid}`);
    }
  } catch (error) {
    console.error("Error in PayU callback:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ PayU failure callback
router.post("/failure", (req, res) => {
  const { txnid, status } = req.body;

  return res.redirect(`http://localhost:5173/client/history?payment=failure&txnid=${txnid}`);
});

module.exports = router;