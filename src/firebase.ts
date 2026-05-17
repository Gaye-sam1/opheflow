import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmGGTaabsFG_p8DEkBpSbt5HHEmTCQqHc",
  authDomain: "opheflow.firebaseapp.com",
  projectId: "opheflow",
  storageBucket: "opheflow.firebasestorage.app",
  messagingSenderId: "898545221027",
  appId: "1:898545221027:web:75e88e05673a8c33546e16"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);