import { db } from './setup'; // Assuming 'db' is your Firestore instance
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Removed Timestamp as it's not directly used here

// create user document
export async function createUserDoc(
    userId,
    userEmail,
    userName,
    userProfileURL = null,
    userBio
) {
    try {
        const userDocRef = doc(db, 'users', userId); // Reference to the specific user's document

        const userProfileData = {
            email: userEmail,
            displayName: userName,
            photoURL: userProfileURL,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            userBio: userBio || '',
        };

        await setDoc(userDocRef, userProfileData, { merge: true });
        console.log(`User profile for ${userId} successfully created/updated in Firestore.`);

    } catch (error) {
        console.error(`Error creating/updating user profile for ${userId}:`, error);
        throw error;
    }
}
