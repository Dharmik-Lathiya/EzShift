const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Trip = require("../../Models/TripSchema");

const MERCHANT_KEY = "Wzipov";
const MERCHANT_SALT = "o5gtUwZoz0SsfzlP79QZ1iiMW756hIYB";

router.post("/pay", async (req, res) => {
  const { amount, email, firstname, txnid, tripId } = req.body;
  if (!tripId) {
    return res.status(400).json({ success: false, message: "tripId is required" });
  }

  const trip = await Trip.findById(tripId);
  if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });
  if (trip.status !== "Completed") {
    return res.status(400).json({ success: false, message: "Payment not allowed. Trip is not completed." });
  } 

  trip.paymentRef = txnid;
  trip.save();

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



module.exports = router;