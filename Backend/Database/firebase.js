// Import the functions you need from the SDKs you need
importScripts('https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.2/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyC44q9D_ymN44N1yJByFptH02mPhSSNcQg",
  authDomain: "ezshift-fafa7.firebaseapp.com",
  projectId: "ezshift-fafa7",
  storageBucket: "ezshift-fafa7.firebasestorage.app",
  messagingSenderId: "72388914696",
  appId: "1:72388914696:web:fbc7feb19a3b1af75c6bbd",
  measurementId: "G-H8KGRRRPRE"
};

const vapidKeys = "BMruF894vKbbp2OJykTdHsQNC_O9b3mfbTHSui_kakTJzQ_LDADNVGI77GixHXzA3Ym9UAqyGWoMQ8tkCwicyC8";

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const requestFCMToken = async () =>{
    return Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            return getToken(messaging, { vapidKey: vapidKeys }).then((currentToken) => {
                if (currentToken) {
                    console.log("FCM Token:", currentToken);
                    return currentToken;
                } else {
                    console.error("No registration token available.");
                }
            }).catch((err) => {
                console.error("An error occurred while retrieving token. ", err);
            });
        } else {
            console.error("Notification permission denied.");
        }
    });
}
