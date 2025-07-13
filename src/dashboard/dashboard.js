import '../style.css';
import { userStore } from '../login/user.js';
import { initMenuComponents } from './interface/components.js';
import { initEvents } from './events/ui-events.js';
import { attachMenuEvents } from './events/ui-events.js';
import { initFolders, loadNoteGroupsFromLocalStorage } from './interface/notes/folder-crud.js';
import { loadTodoObjectFromLocalStorage } from './interface/todo-list/todo-object.js';
import { loadNotesFromLocalStorage } from './interface/notes/notes-object.js';


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