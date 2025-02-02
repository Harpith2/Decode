import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAHSo3A1GVTIp2PucdWDc1JxRwtsiLvLOQ",
    authDomain: "etai-b8626.firebaseapp.com",
    projectId: "etai-b8626",
    storageBucket: "etai-b8626.firebasestorage.app",
    messagingSenderId: "290607638538",
    appId: "1:290607638538:web:16696a0dbea174539b97f3",
    measurementId: "G-2ZM423WQW0"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);