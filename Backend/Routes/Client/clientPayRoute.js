const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const MERCHANT_KEY = "Wzipov";
const MERCHANT_SALT = "o5gtUwZoz0SsfzlP79QZ1iiMW756hIYB";

router.post("/pay", (req, res) => {
  const { amount, email, firstname, productinfo, txnid } = req.body;

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
      productinfo,
      surl: "http://localhost:5173/Client/Map",
      furl: "http://localhost:5173/Client/Payment/Failure",
      hash,
    },
  });
});

module.exports = router;
