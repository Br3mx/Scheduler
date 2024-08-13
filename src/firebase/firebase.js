// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs6HICrvWphK-VOtqPSEQaMMmY20U9qPc",
  authDomain: "wellproject-bc692.firebaseapp.com",
  projectId: "wellproject-bc692",
  storageBucket: "wellproject-bc692.appspot.com",
  messagingSenderId: "174521523027",
  appId: "1:174521523027:web:efeab2eceb26f14f365fa6",
  measurementId: "G-4PDQ3SC7Y4",
  databaseURL:
    "https://wellproject-bc692-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
