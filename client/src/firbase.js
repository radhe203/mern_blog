// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-mern-ac32d.firebaseapp.com",
  projectId: "blog-mern-ac32d",
  storageBucket: "blog-mern-ac32d.appspot.com",
  messagingSenderId: "683990532852",
  appId: "1:683990532852:web:d58eb6ef244c7eec5894a1",
  measurementId: "G-TTK54B9304"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);