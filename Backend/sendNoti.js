const admin = require("firebase-admin");

let serviceAccount;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    // Decode from env
    const decoded = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      "base64"
    ).toString("utf8");
    serviceAccount = JSON.parse(decoded);
  } else {
    // Fallback to local JSON file
    serviceAccount = require("./Database/firebase-service-account.json");
  }
} catch (err) {
  console.error("❌ Failed to load Firebase credentials:", err.message);
  process.exit(1); // Stop app if creds are invalid
}

// Initialize Firebase only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin initialized");
}

/**
 * Send FCM Push Notification
 * @param {string} token - Device FCM token
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {object} data - Extra payload data (optional)
 */
async function sendFCMNotification(token, title, body, data = {}) {
  console.log("📬 Sending FCM notification...");

  const message = {
    notification: { title, body },
    data: { ...data }, // always ensure object spread
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent:", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending notification:", error.message);
    throw error;
  }
}

module.exports = { sendFCMNotification };
