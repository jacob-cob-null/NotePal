import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Added updateProfile
import { createUserDoc } from './user-collection.js';
import { app, auth } from "./setup.js";
import { initTaskSetCollection } from "../dashboard/interface/todo-list/firestore-taskSet-todoItem/taskSet-firestore.js";
import { initFoldersCollection } from "../dashboard/interface/notes/firestore-notes-folder/folder-firestore.js";


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

export async function createAccount(email, password, displayName, userBio) {
  try {
    //Create user account with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Firebase Auth account created:", user.uid);

    //Update the Firebase Authentication user profile (displayName)
    if (user && displayName) {
      await updateProfile(user, { displayName: displayName });
      console.log("Firebase Auth user profile updated with display name:", displayName);
    }

    //Create/update the Firestore user document
    console.log("Creating/updating Firestore user document...");
    await createUserDoc(
      user.uid,
      user.email,
      displayName,
      user.photoURL || null,
      userBio
    );
    console.log("Firestore user document created/updated successfully.");

    await initTaskSetCollection(user.uid)//create task set collection with default file
    await initFoldersCollection(user.uid)//create folder collection with default note
    return user;

  } catch (error) {
    const errorMessage = error.message;
    console.error("Error during account creation or profile setup:", error.code, errorMessage);
    throw new Error(errorMessage);
  }
}
//sign in with gmail
export async function signinWithGoogle() {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      return createUserDoc(
        user.uid,
        user.email,
        user.displayName,
        user.photoURL,
        'New to NotePal? Customize your profile!'
      ).then(() => user); // pass user forward
    })
    .then((user) => {
      return Promise.all([
        initFoldersCollection(user.uid),
        initTaskSetCollection(user.uid)
      ]).then(() => user); // pass user forward if needed
    })
    .then((user) => {
      setTimeout(() => {
        window.location.href = '/src/dashboard/dashboard.html';
      }, 300);
    })
    .catch((error) => {
      console.error("Google sign-in failed:", error.code, error.message);
      alert("Google Sign-In failed. Please try again.");
      throw error;
    });
}