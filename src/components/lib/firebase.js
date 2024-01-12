'use client'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBto-G8fUkWR3YwvD2m4apaN4989Su4_Z4",
  authDomain: "billonoard.firebaseapp.com",
  projectId: "billonoard",
  storageBucket: "billonoard.appspot.com",
  messagingSenderId: "653754481583",
  appId: "1:653754481583:web:d4db0b423a1998cf294d5a",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)