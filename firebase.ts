import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgHnA-MFcTcbyCkel_CljwSPFw_6le8A8",
  authDomain: "afterprogram-6e8d5.firebaseapp.com",
  projectId: "afterprogram-6e8d5",
  storageBucket: "afterprogram-6e8d5.firebasestorage.app",
  messagingSenderId: "366268203250",
  appId: "1:366268203250:web:7f3fc25d5d16aaadb3106b",
  measurementId: "G-YDWZNEMWLF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);