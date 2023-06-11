import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAh_vh0bNoQBeU7dylIZnEZcmdALcBNDZM",
  authDomain: "react-social-media-cf20f.firebaseapp.com",
  projectId: "react-social-media-cf20f",
  storageBucket: "react-social-media-cf20f.appspot.com",
  messagingSenderId: "869679358308",
  appId: "1:869679358308:web:9722992b02308240325a71",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
