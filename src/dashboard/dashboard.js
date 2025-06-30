import '../style.css';
import { userStore } from '../login/login.js';
import { initMenuComponents} from './interface/components.js';
import { initEvents } from './events/ui-events.js';
import { attachMenuEvents } from './events/ui-events.js';
import { initFolders } from './interface/notes/folder-crud.js';

const menuComponents = initMenuComponents();
initEvents(menuComponents);
attachMenuEvents();
initFolders();
