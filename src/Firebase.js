import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEdIJAc0pFKPpoGsdWyCn2yMVVW8lNdvc",
  authDomain: "my-app-6493a.firebaseapp.com",
  projectId: "my-app-6493a",
  storageBucket: "my-app-6493a.firebasestorage.app",
  messagingSenderId: "555872307744",
  appId: "1:555872307744:web:3a0727fb35c91cd76c0a45",
  measurementId: "G-04MED7SWEN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
