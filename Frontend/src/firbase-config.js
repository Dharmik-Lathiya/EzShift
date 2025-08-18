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
export const messaging = getMessaging(app);
