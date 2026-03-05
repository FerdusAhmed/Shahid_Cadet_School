import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkUwgqvPYEGwkaeWg2iYfckx_EsX3OX2Y",
  authDomain: "shahid-cadet-school.firebaseapp.com",
  projectId: "shahid-cadet-school",
  storageBucket: "shahid-cadet-school.firebasestorage.app",
  messagingSenderId: "712987260893",
  appId: "1:712987260893:web:34642fbda77ed2be046834"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);