// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcbyD2V36E3u40d53F_y1xAibC9WTTS7Y",
  authDomain: "api-app-23303.firebaseapp.com",
  databaseURL: "https://api-app-23303-default-rtdb.firebaseio.com",
  projectId: "api-app-23303",
  storageBucket: "api-app-23303.appspot.com",
  messagingSenderId: "145846082095",
  appId: "1:145846082095:web:f9ee3f595b36a41dea44da",
  measurementId: "G-EC42WSED04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
getAnalytics(app);
