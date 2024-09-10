// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6Tt28xywbZC30R3QfgmQSyTMmZmqlQYU",
  authDomain: "martijnkozijnai.firebaseapp.com",
  projectId: "martijnkozijnai",
  storageBucket: "martijnkozijnai.appspot.com",
  messagingSenderId: "1003198142337",
  appId: "1:1003198142337:web:97da90235062c360d73a80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);
