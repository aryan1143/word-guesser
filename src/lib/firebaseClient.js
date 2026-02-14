import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "w-guesser.firebaseapp.com",
  projectId: "w-guesser",
  storageBucket: "w-guesser.firebasestorage.app",
  messagingSenderId: "701458753321",
  appId: "1:701458753321:web:ea52f17930d84df4503938",
  measurementId: "G-QHX5GTNMSD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

