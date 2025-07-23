import '../style.css';
import { initMenuComponents, mainWorkspace, workspace_title } from './interface/components.js';
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

//initialize user profile
const user = userStore.getUser()
initUser();
//folders
initFolders(user.uid);
//menu
const menuComponents = initMenuComponents();
initEvents(menuComponents);
attachMenuEvents();

//load data from firestore
initFirestore()

//load data


starterView()

//initial view    
async function starterView() {
    msgAlert("Loading content")
    await loadTodoObjectFromLocalStorage(user.uid)
    await loadNotesFromLocalStorage(user.uid)
    workspace_title.innerText = "Notes";

    mainWorkspace.innerHTML = '';
    if (mainWorkspace.classList.contains('justify-center')) {
        mainWorkspace.classList.remove('justify-center')
    }

    // Ensure note groups stay visible if sidebar is open on desktop
    const noteGroup = document.getElementById("noteGroup");
    const mainWindow = menuComponents.mainWindow;
    const folderBtns = document.querySelector("#folderBtns");
    const line = document.querySelector("hr");

    if (window.innerWidth >= 640 && !mainWindow?.classList.contains("collapsed")) {
        noteGroup?.classList.remove("invisible");
        folderBtns?.classList.remove("invisible");
        line?.classList.remove("invisible");
    }

    //group these
    initNotes();
    displayNotes();

    // Restore visibility after rendering notes (in case DOM nodes were replaced)
    const noteGroupNew = document.getElementById("noteGroup");
    const folderBtnsNew = document.querySelector("#folderBtns");
    const lineNew = document.querySelector("hr");
    if (window.innerWidth >= 640 && !mainWindow?.classList.contains("collapsed")) {
        noteGroupNew?.classList.remove("invisible");
        folderBtnsNew?.classList.remove("invisible");
        lineNew?.classList.remove("invisible");
    }
}
