const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Trip = require("../../Models/TripSchema");

const MERCHANT_KEY = "Wzipov";
const MERCHANT_SALT = "o5gtUwZoz0SsfzlP79QZ1iiMW756hIYB";

router.post("/pay", async (req, res) => {
  const { amount, email, firstname, productinfo, txnid, tripId } = req.body;
  if (!tripId) {
    return res.status(400).json({ success: false, message: "tripId is required" });
  }
  // Find the trip and check status
  const trip = await Trip.findById(tripId);
  if (!trip) {
    return res.status(404).json({ success: false, message: "Trip not found" });
  }
  if (trip.status !== "Completed") {
    return res.status(400).json({ success: false, message: "Payment not allowed. Trip is not completed." });
  }

  const hashString = `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${MERCHANT_SALT}`;
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  // Set trip status to Paid
  trip.status = "Paid";
  await trip.save();

  res.json({
    success: true,
    data: {
      key: MERCHANT_KEY,
      txnid,
      amount,
      firstname,
      email,
      productinfo,
      surl: "http://localhost:5173/Client/Map",
      furl: "http://localhost:5173/Client/Payment/Failure",
      hash,
    },
  });
});

module.exports = router;
