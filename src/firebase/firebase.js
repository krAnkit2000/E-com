// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHqqM6LWkKaSNP9zu8Ddm3SwKf337SRbE",
  authDomain: "e-com-4aef5.firebaseapp.com",
  projectId: "e-com-4aef5",
  storageBucket: "e-com-4aef5.firebasestorage.app",
  messagingSenderId: "292196220653",
  appId: "1:292196220653:web:b4959ea5bfff8b536956e4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
