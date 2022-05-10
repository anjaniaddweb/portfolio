// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCpi4tNrTvVG-VwuSXXdXYsBhYmd9NM9o",
  authDomain: "influencer-74f40.firebaseapp.com",
  projectId: "influencer-74f40",
  storageBucket: "influencer-74f40.appspot.com",
  messagingSenderId: "704586750249",
  appId: "1:704586750249:web:f6aab8783bb50e04253f38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }