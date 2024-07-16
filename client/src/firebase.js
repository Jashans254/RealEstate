// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArZYTweaxl3N1qJWyXnUJFWIken5JoPW4",
  authDomain: "mern-estate-e3d1d.firebaseapp.com",
  projectId: "mern-estate-e3d1d",
  storageBucket: "mern-estate-e3d1d.appspot.com",
  messagingSenderId: "89984620532",
  appId: "1:89984620532:web:0d9997419f117206bccba1"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);