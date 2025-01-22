// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBXkvWo62lkiUIEsE0SFd1o8g2_vQCJozY",
    authDomain: "platform-780bc.firebaseapp.com",
    projectId: "platform-780bc",
    storageBucket: "platform-780bc.firebasestorage.app",
    messagingSenderId: "270806113383",
    appId: "1:270806113383:web:b52b34bcb9ee8b7e1748c2",
    measurementId: "G-DT1TFZD4WS"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
