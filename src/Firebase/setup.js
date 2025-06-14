// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-xggrQxhX8FxJ5dLMyqCYCWN3YtNINtA",
  authDomain: "notepal-d2ceb.firebaseapp.com",
  projectId: "notepal-d2ceb",
  storageBucket: "notepal-d2ceb.firebasestorage.app",
  messagingSenderId: "293016487944",
  appId: "1:293016487944:web:a49924185ce8d272e1a9bd",
  measurementId: "G-S3FCXYRXCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app