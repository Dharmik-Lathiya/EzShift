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
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.error('Notification permission denied.');
      return;
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
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
  }
};

export const listenForMessages = (callback) => {
  onMessage(messaging, (payload) => {
    console.log('[firebase.js] Foreground message:', payload);
    if (callback && typeof callback === 'function') {
      callback(payload);
    }
  });
};