// src/auth/auth.js
import '../style.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/setup.js';

export async function loginWithEmail(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
