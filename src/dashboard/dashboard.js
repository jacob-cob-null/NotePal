import '../style.css';
import { initMenuComponents, mainWorkspace, workspace_title, profilePic } from './interface/components.js';
import { initEvents } from './events/ui-events.js';
import { attachMenuEvents } from './events/ui-events.js';
import { initFolders, loadNoteGroupsFromLocalStorage } from './interface/notes/folder-crud.js';
import { loadTodoObjectFromLocalStorage } from './interface/todo-list/todo-object.js';
import { loadNotesFromLocalStorage } from './interface/notes/notes-object.js';
import { initUser } from '../login/user.js';
import { initFirestore } from '../Firebase/initDocs.js';
import { userStore } from '../login/user.js';
import { initNotes, displayNotes } from './interface/notes/notes.render.js';
import { msgAlert } from './events/alerts.js';
import { customEvent } from './interface/calendar/event-object.js';
import { initEventsFromFirestore } from './interface/calendar/calendar-firestore.js';


async function init() {
    await initUser();
    const user = userStore.getUser();

    if (!user || !user.uid) {
        return;
    }

    // Initialize other components
    initFolders(user.uid);

    // Menu
    const menuComponents = initMenuComponents();
    initEvents(menuComponents);
    attachMenuEvents();

    // Load data from firestore
    initFirestore();

    // Start the main view
    await starterView(user);
}

// Initial view    
async function starterView(user) {
    console.log("🎬 starterView() started with user:", user);

    msgAlert("Loading content");

    await loadTodoObjectFromLocalStorage(user.uid);
    await loadNotesFromLocalStorage(user.uid);
    customEvent.clearAll();
    await initEventsFromFirestore(user.uid);

    workspace_title.innerText = "Notes";

    const profileImg = document.getElementById('profile');
    console.log("🖼️ Profile image element:", {
        element: !!profileImg,
        currentSrc: profileImg?.src,
        userPhotoURL: user.photoURL
    });

    if (profileImg && user.photoURL) {
        if (!profileImg.src || profileImg.src.includes('gravatar')) {
            console.log("🔄 Backup: Setting profile image in starterView:", user.photoURL);

        } else {
            console.log("✅ Profile image already set, skipping backup");
        }
    }

    mainWorkspace.innerHTML = '';
    if (mainWorkspace.classList.contains('justify-center')) {
        mainWorkspace.classList.remove('justify-center');
        initNotes();
        displayNotes();
    }
}
init()