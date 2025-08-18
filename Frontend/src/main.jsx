// src/main.jsx

import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router";
import App from './App.jsx';
import { messaging } from './firbase-config.js';
import { getToken, onMessage } from 'firebase/messaging';

const vapidKey = "BMruF894vKbbp2OJykTdHsQNC_O9b3mfbTHSui_kakTJzQ_LDADNVGI77GixHXzA3Ym9UAqyGWoMQ8tkCwicyC8";

async function requestFCMToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission denied.');
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

      if (token) {
      return token;
    } else {
      console.warn('No registration token available.');
      return null;
    }
  } catch (err) {
    console.error('Error getting FCM token:', err);
    return null;
  }
}

onMessage(messaging, (payload) => {
  console.log('Foreground message received:', payload);
  const { title, body, icon } = payload.notification || {};
  new Notification(title || 'New Message', {
    body: body || '',
    icon: icon || '/favicon.ico',
  });
});

function Root() {
  const [fcmToken, setFcmToken] = React.useState(null);

  React.useEffect(() => {
    requestFCMToken().then((token) => {
      if (token) setFcmToken(token);
    });
  }, []);

  return <BrowserRouter><App fcmToken={fcmToken} /></BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<Root />);
