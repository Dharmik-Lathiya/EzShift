// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyC44q9D_ymN44N1yJByFptH02mPhSSNcQg",
  authDomain: "ezshift-fafa7.firebaseapp.com",
  projectId: "ezshift-fafa7",
  storageBucket: "ezshift-fafa7.firebasestorage.app",
  messagingSenderId: "72388914696",
  appId: "1:72388914696:web:fbc7feb19a3b1af75c6bbd",
  measurementId: "G-H8KGRRRPRE"
};

const app = initializeApp(firebaseConfig);

// Firebase Messaging only works in secure contexts (HTTPS or localhost) on
// browsers with Notification + service worker support. Calling getMessaging()
// on an unsupported browser throws `messaging/unsupported-browser` and used to
// crash the whole app at import time on phones served over plain http://.
// Guard it so the app always renders; push is simply unavailable there.
export const messaging = (() => {
  try {
    if (typeof window === 'undefined') return null;
    if (!('Notification' in window)) return null;
    if (!('serviceWorker' in navigator)) return null;
    const isSecure =
      window.isSecureContext ||
      ['localhost', '127.0.0.1'].includes(window.location?.hostname);
    if (!isSecure) return null;
    return getMessaging(app);
  } catch (err) {
    console.warn('[firebase] Messaging unavailable:', err?.code || err?.message);
    return null;
  }
})();