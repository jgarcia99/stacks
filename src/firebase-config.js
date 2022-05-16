import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  // I would put this in an .env file but so you guys can see kept it here.
  apiKey: "AIzaSyA_LvvOhe4AaWyqAzczZcxg315Nj6x7oYI",
  authDomain: "fullstack-challenge-2f582.firebaseapp.com",
  projectId: "fullstack-challenge-2f582",
  storageBucket: "fullstack-challenge-2f582.appspot.com",
  messagingSenderId: "369273983690",
  appId: "1:369273983690:web:ad7fc342dd7f4f3fbe5a33",
  measurementId: "G-XRELBDJHZJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);