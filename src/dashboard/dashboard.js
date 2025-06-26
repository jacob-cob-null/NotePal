import '../style.css';
import { userStore } from '../login/login.js';
import { initMenuComponents} from './interface/components.js';
import { initEvents } from './events/ui-events.js';
import { attachMenuEvents } from './events/ui-events.js';
import { renderNoteComponents, noteEvents } from './interface/notes/notes.render.js';
import { initNoteGroup } from './interface/notes/notes-obj.js';
const menuComponents = initMenuComponents();
initEvents(menuComponents);
initNoteGroup();
attachMenuEvents();
renderNoteComponents();
noteEvents()

