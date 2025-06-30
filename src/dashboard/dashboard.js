import '../style.css';
import { userStore } from '../login/login.js';
import { initMenuComponents} from './interface/components.js';
import { initEvents } from './events/ui-events.js';
import { attachMenuEvents } from './events/ui-events.js';
<<<<<<< HEAD
import { initFolders } from './interface/notes/note-folder.js';
=======
import { initFolders} from './interface/notes/note-folder.js';
>>>>>>> f787496 (add function to block duplicate in folder creation)

const menuComponents = initMenuComponents();
initEvents(menuComponents);
attachMenuEvents();
initFolders();
