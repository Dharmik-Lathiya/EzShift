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

router.post("/pay", async (req, res) => {
  const { amount, email, firstname, txnid, tripId } = req.body;
  if (!tripId) {
    return res.status(400).json({ success: false, message: "tripId is required" });
  }

  // ✅ Check trip exists and is completed
  const trip = await Trip.findById(tripId);
  if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });
  if (trip.status !== "Completed") {
    return res.status(400).json({ success: false, message: "Payment not allowed. Trip is not completed." });
  }

  // Store txnid in the trip
  trip.paymentRef = txnid;
  trip.save();

  // ✅ Prepare hash for PayU
  const productinfo = tripId;
  const hashString = `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${MERCHANT_SALT}`;
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  res.json({
    success: true,
    data: {
      key: MERCHANT_KEY,
      txnid,
      amount,
      firstname,
      email,
      productinfo: productinfo,
      surl: "http://localhost:3000/api/payu/payment/success",
      furl: "http://localhost:3000/api/payu/payment/failure",
      notify_url: "http://localhost:3000/api/payu/payment/callback",
      hash,
    },
  });
});

// Backend
router.post("/payment/success", (req, res) => {
  const { txnid } = req.body;
  return res.redirect(`http://localhost:5173/client/history?payment=success&txnid=${txnid}`);
});

router.post("/payment/failure", (req, res) => {
  const { txnid } = req.body;
  return res.redirect(`http://localhost:5173/client/history?payment=failure&txnid=${txnid}`);
});



module.exports = router;