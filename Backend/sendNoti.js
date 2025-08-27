const admin = require('./Database/firebase');

/**
 * Send FCM Push Notification
 * @param {string} token - Device FCM token
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {object} data - Extra payload data (optional)
 */
async function sendFCMNotification(token, title, body, data = {}) {
  console.log("📬 Sending FCM notification...");
  console.log("Token:", token);
  console.log("Title:", title);
  console.log("Body:", body);
  console.log("Data:", data);
  

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
