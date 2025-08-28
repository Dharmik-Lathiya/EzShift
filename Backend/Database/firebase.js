const admin = require('firebase-admin');
require('dotenv').config();

// Check if the Base64 environment variable exists
if (!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is not set.');
}

// Decode the Base64 string to a JSON string
const serviceAccountJson = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8');

// Parse the JSON string into an object
const serviceAccount = JSON.parse(serviceAccountJson);

// Initialize the Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;