// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCx1GSQO-9s47tw5Y5rOuQLTEwGo2U_828",
  authDomain: "notely-fa3db.firebaseapp.com",
  projectId: "notely-fa3db",
  storageBucket: "notely-fa3db.firebasestorage.app",
  messagingSenderId: "493814151742",
  appId: "1:493814151742:web:c36443801ef3b87d532f6f",
  measurementId: "G-10QFK6B76K",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
