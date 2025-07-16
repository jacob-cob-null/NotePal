import '../style.css';
import { userStore } from '../login/user.js';
import { initMenuComponents, mainWorkspace } from './interface/components.js';
import { initEvents } from './events/ui-events.js';
import { attachMenuEvents } from './events/ui-events.js';
import { initFolders, loadNoteGroupsFromLocalStorage } from './interface/notes/folder-crud.js';
import { loadTodoObjectFromLocalStorage } from './interface/todo-list/todo-object.js';
import { loadNotesFromLocalStorage } from './interface/notes/notes-object.js';
import { msgAlert } from './events/alerts.js';
import { getUserProfile } from '../Firebase/user-collection.js';
import { spinnerTrigger } from './events/util.js';
//initialize user profile

async function initUser() {
    const storedUserInfo = userStore.getUser();
    spinnerTrigger(true, mainWorkspace)

    // Check if we have a user and their UID
    if (!storedUserInfo || !storedUserInfo.uid) {
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
            spinnerTrigger(false, mainWorkspace)
        } else {
            console.warn(`User ${storedUserInfo.uid} logged in, but no Firestore profile found. Redirecting to login.`);
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 5000);
        }
    } catch (error) {
        console.error("Error fetching full user profile:", error);
        setTimeout(() => {
            window.location.href = '../login/login.html';
        }, 5000);
    }
}
//user
document.addEventListener('DOMContentLoaded', async () => {
    await initUser();
});

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