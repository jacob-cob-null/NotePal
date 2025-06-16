import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'; // ✅ Add this line

const firebaseConfig = {
  apiKey: 'AIzaSyB-xggrQxhX8FxJ5dLMyqCYCWN3YtNINtA',
  authDomain: 'notepal-d2ceb.firebaseapp.com',
  projectId: 'notepal-d2ceb',
  storageBucket: 'notepal-d2ceb.firebasestorage.app',
  messagingSenderId: '293016487944',
  appId: '1:293016487944:web:a49924185ce8d272e1a9bd',
  measurementId: 'G-S3FCXYRXCH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Auth and export it
const auth = getAuth(app);

export { auth }; // ✅ Export the auth instance
