// src/auth/auth.js
import '../style.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from '../Firebase/setup.js';

export async function loginWithEmail(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function createAccount(email, password) {

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw error;
    });
}

