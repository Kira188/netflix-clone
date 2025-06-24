// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyCTIbs7dX4K-X_duHvNUoXCmcFuVFOWlfg",
  authDomain: "netflix-clone-9a54a.firebaseapp.com",
  projectId: "netflix-clone-9a54a",
  storageBucket: "netflix-clone-9a54a.firebasestorage.app",
  messagingSenderId: "333628603609",
  appId: "1:333628603609:web:d1d85f72c69127438e12c8",
  measurementId: "G-HE5H3Z8T4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth , firebaseConfig};