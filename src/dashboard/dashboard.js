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
loadTodoObjectFromLocalStorage(user.uid)
loadNotesFromLocalStorage()

starterView()

//initial view    
async function starterView() {
    workspace_title.innerText = "Notes";

    mainWorkspace.innerHTML = '';
    if (mainWorkspace.classList.contains('justify-center')) {
        mainWorkspace.classList.remove('justify-center')
    }
    //group these
    initNotes();
    displayNotes();

}
