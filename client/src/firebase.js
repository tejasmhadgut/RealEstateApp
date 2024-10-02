// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestatejsx.firebaseapp.com",
  projectId: "realestatejsx",
  storageBucket: "realestatejsx.appspot.com",
  messagingSenderId: "254444021784",
  appId: "1:254444021784:web:9170e40b369bf8b825bb6d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);