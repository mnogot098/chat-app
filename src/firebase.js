// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtC5zu8DFZ2pypwj33RJvkvFoLkJCrhNo",
  authDomain: "react-chat-app-eafdd.firebaseapp.com",
  projectId: "react-chat-app-eafdd",
  storageBucket: "react-chat-app-eafdd.appspot.com",
  messagingSenderId: "430029236179",
  appId: "1:430029236179:web:a34817bd749136dcabf126",
  measurementId: "G-1Z4CTX0PJC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
