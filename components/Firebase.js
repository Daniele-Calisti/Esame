import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFu8QaULKyu3bX9o00qQmWXa69xrg5cWs",
    authDomain: "esame-326913.firebaseapp.com",
    projectId: "esame-326913",
    storageBucket: "esame-326913.appspot.com",
    messagingSenderId: "404096939057",
    appId: "1:404096939057:web:cfe43c26c613818e041110",
    measurementId: "G-DVGFHQ9J3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default db;
