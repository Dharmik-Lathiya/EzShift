import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC44q9D_ymN44N1yJByFptH02mPhSSNcQg",
  authDomain: "ezshift-fafa7.firebaseapp.com",
  projectId: "ezshift-fafa7",
  storageBucket: "ezshift-fafa7.firebasestorage.app",
  messagingSenderId: "72388914696",
  appId: "1:72388914696:web:fbc7feb19a3b1af75c6bbd",
  measurementId: "G-H8KGRRRPRE"
};

const vapidKey = 'BMruF894vKbbp2OJykTdHsQNC_O9b3mfbTHSui_kakTJzQ_LDADNVGI77GixHXzA3Ym9UAqyGWoMQ8tkCwicyC8';

const app = initializeApp(firebaseConfig);

// Same guard as src/firebase-config.js — getMessaging() throws on browsers
// without push support (e.g. a phone on plain http://), which used to crash
// every page that imported this file.
const messaging = (() => {
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
    console.warn('[firebase.js] Messaging unavailable:', err?.code || err?.message);
    return null;
  }
})();

export const requestFCMToken = async () => {
  if (!messaging) return null;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.error('Notification permission denied.');
      return null;
    }

    const registration = await navigator.serviceWorker.ready;

    const currentToken = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      return currentToken;
    } else {
      console.error('No registration token available.');
      return null;
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
    return null;
  }
};

export const listenForMessages = (callback) => {
  if (!messaging) return () => {};
  return onMessage(messaging, (payload) => {
    console.log('[firebase.js] Foreground message:', payload);
    if (callback && typeof callback === 'function') {
      callback(payload);
    }
  });
};