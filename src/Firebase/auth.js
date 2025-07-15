import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Added updateProfile
import { createUserDoc } from './user-collection.js';
import { app, auth } from "./setup.js";

/**
 * Signs in a user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The Firebase User object upon successful login.
 */
export async function loginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in successfully:", user.uid);
    return user;
  } catch (error) {
    console.error("Error logging in with email:", error.code, error.message);
    throw new Error(error.message); // Re-throw for UI to handle
  }
}

/**
 * Creates a new user account with email and password,
 * updates their Auth profile, and creates their Firestore user document.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} displayName - The user's chosen display name.
 * @param {string} userBio - The user's chosen short biography.
 * @returns {Promise<Object>} The Firebase User object upon successful registration.
 */
export async function createAccount(email, password, displayName, userBio) { // Added displayName, userBio arguments
  try {
    //Create user account with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Firebase Auth account created:", user.uid);

    //Update the Firebase Authentication user profile (displayName)

    if (user && displayName) { // Only attempt if user exists and displayName is provided
      await updateProfile(user, { displayName: displayName });
      console.log("Firebase Auth user profile updated with display name:", displayName);
    }

    // 3. Create/update the Firestore user document
    // Pass along user's UID, email, the provided displayName and userBio, and Auth's photoURL
    console.log("Creating/updating Firestore user document...");
    await createUserDoc(
      user.uid,
      user.email,
      displayName,              // Use the displayName provided from the UI
      user.photoURL || null,    // Use Auth's photoURL if available, otherwise null
      userBio                   // Use the userBio provided from the UI
    );
    console.log("Firestore user document created/updated successfully.");

    return user; // Return the user after both Auth and Firestore profile creation are complete
  } catch (error) {
    const errorMessage = error.message;
    console.error("Error during account creation or profile setup:", error.code, errorMessage);
    throw new Error(errorMessage); // Re-throw the error for UI to handle
  }
}
