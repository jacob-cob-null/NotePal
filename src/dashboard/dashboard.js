import '../style.css';
import { initMenuComponents } from './interface/components.js';
import { initEvents } from './events/ui-events.js';
import { attachMenuEvents } from './events/ui-events.js';
import { initFolders, loadNoteGroupsFromLocalStorage } from './interface/notes/folder-crud.js';
import { loadTodoObjectFromLocalStorage } from './interface/todo-list/todo-object.js';
import { loadNotesFromLocalStorage } from './interface/notes/notes-object.js';
import { initUser } from '../login/user.js';
import { initFirestore } from '../Firebase/initDocs.js';
import { userStore } from '../login/user.js';

//initialize user profile
const user = userStore.getUser()
initUser();

//menu
const menuComponents = initMenuComponents();
initEvents(menuComponents);
attachMenuEvents();

//folders
initFolders();

//load data from firestore
initFirestore()

//load data
loadTodoObjectFromLocalStorage(user.uid)
loadNoteGroupsFromLocalStorage()
loadNotesFromLocalStorage()