import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAij0lK9KjYdU5nWMXZboBsjx9_HmX8jt0",
    authDomain: "keep-notes-81302.firebaseapp.com",
    projectId: "keep-notes-81302",
    storageBucket: "keep-notes-81302.appspot.com",
    messagingSenderId: "1062961413986",
    appId: "1:1062961413986:web:558515f1298bb73844363b",
    measurementId: "G-HPM0FC0VZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);