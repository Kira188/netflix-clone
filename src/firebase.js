// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbAPTDWObgfPNfS9HfNy0rUMJf5_k_0W0",
  authDomain: "netflix-clone-9a54a.firebaseapp.com",
  databaseURL: "https://netflix-clone-9a54a-default-rtdb.firebaseio.com",
  projectId: "netflix-clone-9a54a",
  storageBucket: "netflix-clone-9a54a.firebasestorage.app",
  messagingSenderId: "333628603609",
  appId: "1:333628603609:web:6799c2bc6ae08bc28e12c8",
  measurementId: "G-E6YDFNRKXX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth , firebaseConfig};