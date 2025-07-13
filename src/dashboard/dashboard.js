import '../style.css';
import { userStore } from '../login/user.js';
import { initMenuComponents } from './interface/components.js';
import { initEvents } from './events/ui-events.js';
import { attachMenuEvents } from './events/ui-events.js';
import { initFolders, loadNoteGroupsFromLocalStorage } from './interface/notes/folder-crud.js';
import { loadTodoObjectFromLocalStorage } from './interface/todo-list/todo-object.js';
import { loadNotesFromLocalStorage } from './interface/notes/notes-object.js';
import { msgAlert } from './events/alerts.js';
import { getUserProfile } from '../Firebase/user-collection.js';
//initialize user profile
async function initUser() {
    const storedUserInfo = userStore.getUser();

    // Check if we have a user and their UID
    if (!storedUserInfo || !storedUserInfo.uid) {
        // No user logged in or UID not found, redirect to login
        console.log("No user info in userStore, redirecting to login.");
        setTimeout(() => {
            window.location.href = '../login/login.html';
        }, 1000);
        return;
    }

    // We have a UID, now fetch the full profile from Firestore
    try {
        const fullUserProfile = await getUserProfile(storedUserInfo.uid);

        if (fullUserProfile) {
            // User profile found in Firestore, use its displayName
            const navbarNameElement = document.getElementById('username');
            const userName = fullUserProfile.displayName || fullUserProfile.email || 'NotePal User'; // Provide fallbacks
            if (navbarNameElement) {
                navbarNameElement.textContent = `Welcome! ${userName}`;
                navbarNameElement.classList.add('ml-1')
            } else {
                console.warn("Element with ID 'username' not found in the DOM.");
            }
            console.log("Full user profile loaded:", fullUserProfile);

        } else {
            // User is logged in via Auth (has a UID), but no profile in Firestore.
            // This might happen if the Cloud Function for profile creation failed,
            // or if the profile was deleted.
            console.warn(`User ${storedUserInfo.uid} logged in, but no Firestore profile found. Redirecting to login.`);
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 10000);
        }
    } catch (error) {
        console.error("Error fetching full user profile:", error);
        setTimeout(() => {
            window.location.href = '../login/login.html';
        }, 10000);
    }
}
//user
await initUser()
//menu
const menuComponents = initMenuComponents();
initEvents(menuComponents);
attachMenuEvents();

//folders
initFolders();

//load data
loadTodoObjectFromLocalStorage()
loadNoteGroupsFromLocalStorage()
loadNotesFromLocalStorage()