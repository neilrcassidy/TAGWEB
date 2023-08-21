// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiVFNDlPHa5P3zRvgvhbEGK9Hn0b4yDO0",
  authDomain: "tag1-1056a.firebaseapp.com",
  projectId: "tag1-1056a",
  storageBucket: "tag1-1056a.appspot.com",
  messagingSenderId: "897659663777",
  appId: "1:897659663777:web:81ebf985c503ce343cc7e0",
  measurementId: "G-7KGZ0REJK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)