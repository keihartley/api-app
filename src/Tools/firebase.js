// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3Pkc0odCSCxNet4GhPW7_QJStfxet1vw",
  authDomain: "ai-art-676e8.firebaseapp.com",
  projectId: "ai-art-676e8",
  storageBucket: "ai-art-676e8.appspot.com",
  messagingSenderId: "854455621715",
  appId: "1:854455621715:web:71129decf41ae1a5fa0ea6",
  measurementId: "G-QLSTDGEF3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);