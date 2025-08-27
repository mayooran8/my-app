// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config object here
  apiKey: "AIzaSyCEdIJAc0pFKPpoGsdWyCn2yMVVW8lNdvc",
  authDomain: "my-app-6493a.firebaseapp.com",
  projectId: "my-app-6493a",
  storageBucket: "my-app-6493a.firebasestorage.app",
  messagingSenderId: "555872307744",
  appId: "1:555872307744:web:3a0727fb35c91cd76c0a45",
  measurementId: "G-04MED7SWEN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
