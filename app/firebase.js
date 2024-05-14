// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Constants } from "expo-constants";

const firebaseConfig = {
  apiKey: "AIzaSyA_3XHlKNL9C4nmVefuApYa8VqOJi7C0z8",
  authDomain: "baymax-6e4c0.firebaseapp.com",
  projectId: "baymax-6e4c0",
  storageBucket: "baymax-6e4c0.appspot.com",
  messagingSenderId: "85699788689",
  appId: "1:85699788689:web:cb49cdb95b267a244fe430",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
