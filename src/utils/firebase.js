// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBst768QEels8D2cgGYb786avDlqr8zyqg",
    authDomain: "recipe-sharing-app-d4a1d.firebaseapp.com",
    projectId: "recipe-sharing-app-d4a1d",
    storageBucket: "recipe-sharing-app-d4a1d.appspot.com",
    messagingSenderId: "333025782608",
    appId: "1:333025782608:web:424d8f5eacc81a8fff1a55",
    measurementId: "G-BZRL2W22G6"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

