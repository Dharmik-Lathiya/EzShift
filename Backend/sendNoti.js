const admin = require("firebase-admin");

const serviceAccount = require("./Database/firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function sendFCMNotification(token, title, body, data = {}) {
    console.log("📬 Sending FCM notification...");
    console.log(token, title, body, data);
    
  const message = {
    notification: {
      title,
      body
    },
    data, // extra custom data (optional)
    token // Device token (from client)
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Successfully sent:", response);
  } catch (error) {
    console.error("❌ Error sending:", error);
  }
}

module.exports = { sendFCMNotification };
