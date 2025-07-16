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
    console.log("🧠 Loaded from userStore:", storedUserInfo);
    if (!storedUserInfo || !storedUserInfo.uid) {
        console.log("No user info in userStore, redirecting to login.");
        setTimeout(() => {
            window.location.href = '../login/login.html';
        }, 1000);
        return;
    }
    const navbarNameElement = document.getElementById('username');
    if (sessionStorage.getItem('userInitialized')) {
        const userName = storedUserInfo.displayName || storedUserInfo.email || 'NotePal User';
        if (navbarNameElement) {
            navbarNameElement.textContent = `Welcome! ${userName}`;
            navbarNameElement.classList.add('ml-2');
        }
        return;
    }

    spinnerTrigger(true, mainWorkspace);

    try {
        const fullUserProfile = await getUserProfile(storedUserInfo.uid);

        if (fullUserProfile) {
            const userName = fullUserProfile.displayName || fullUserProfile.email || 'NotePal User';

            if (navbarNameElement) {
                navbarNameElement.textContent = `Welcome! ${userName}`;
                navbarNameElement.classList.add('ml-2');
            }
            userStore.setUser({
                uid: storedUserInfo.uid,
                displayName: fullUserProfile.displayName,
                email: fullUserProfile.email
            });
            sessionStorage.setItem('userInitialized', 'true'); //flag that user credentials have been loaded
            spinnerTrigger(false, mainWorkspace);
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
initUser();
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