// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgmRLyPaTtcRVdRpT1o2L7Z7BkKm-QWuM",
  authDomain: "learning-management-db.firebaseapp.com",
  projectId: "learning-management-db",
  storageBucket: "learning-management-db.appspot.com",
  messagingSenderId: "1091719477455",
  appId: "1:1091719477455:web:2aff2779ca4be14b7b5fba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;