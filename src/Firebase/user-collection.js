import { db } from './setup';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

// create user document
export async function createUserDoc(
    userId,
    userEmail,
    userName,
    userProfileURL = null,
    userBio
) {
    try {
        //params, db | collection | defined id
        const userDocRef = doc(db, 'users', userId); // Reference to the specific user's document

        //user object
        const userProfileData = {
            email: userEmail,
            displayName: userName,
            photoURL: userProfileURL,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            userBio: userBio || '',
        };
        //create or update if existing
        await setDoc(userDocRef, userProfileData, { merge: true });
        console.log(`User profile for ${userId} successfully created/updated in Firestore.`);

    } catch (error) {
        console.error(`Error creating/updating user profile for ${userId}:`, error);
        throw error;
    }
}

export async function getUserProfile(userId) {
    try {
        const userDocRef = doc(db, 'users', userId); // Reference to the specific user's document
        const userSnapshot = await getDoc(userDocRef); // Get the document snapshot

        if (userSnapshot.exists()) {
            // If the document exists, return its data along with its ID
            return {
                id: userSnapshot.id,
                ...userSnapshot.data() //rest of the data
            };
        } else {
            // Document does not exist
            console.log(`User profile not found for ID: ${userId}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching user profile for ${userId}:`, error);
        throw error; // Re-throw the error for the calling function to handle
    }
}