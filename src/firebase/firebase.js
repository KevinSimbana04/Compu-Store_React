// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_JLfAvWJKkBLIlQ_N_hBRRFSv6OpoE6o",
    authDomain: "compustore-di.firebaseapp.com",
    projectId: "compustore-di",
    storageBucket: "compustore-di.firebasestorage.app",
    messagingSenderId: "984609857620",
    appId: "1:984609857620:web:4aac166de500ef7d938dc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
