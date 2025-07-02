// src/Firebase/setup.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB-xggrQxhX8FxJ5dLMyqCYCWN3YtNINtA',
  authDomain: 'notepal-d2ceb.firebaseapp.com',
  projectId: 'notepal-d2ceb',
  storageBucket: 'notepal-d2ceb.firebasestorage.app',
  messagingSenderId: '293016487944',
  appId: '1:293016487944:web:a49924185ce8d272e1a9bd',
  measurementId: 'G-S3FCXYRXCH',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
