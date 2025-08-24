// /public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC44q9D_ymN44N1yJByFptH02mPhSSNcQg",
  authDomain: "ezshift-fafa7.firebaseapp.com",
  projectId: "ezshift-fafa7",
  storageBucket: "ezshift-fafa7.firebasestorage.app",
  messagingSenderId: "72388914696",
  appId: "1:72388914696:web:fbc7feb19a3b1af75c6bbd",
  measurementId: "G-H8KGRRRPRE"
});

const messaging = firebase.messaging();

// Listen for push in SW
self.addEventListener("push", (event) => {
  const payload = event.data.json();
  console.log("📩 Push received in SW:", payload);

  const title = payload.notification?.title || "New Notification";
  const body = payload.notification?.body || "";
  const data = payload.data || {};

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/logo.png",
      data,
    })
  );

  // Send data to React app
  self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "NEW_NOTIFICATION",
        tripId: data.tripId,
        title,
        body,
      });
    });
  });
});
