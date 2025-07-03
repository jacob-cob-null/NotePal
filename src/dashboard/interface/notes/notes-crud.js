import '../../../style.css';
import EasyMDE from 'easymde';
import { addNotes } from './notes-object';

//note object factory
export function createNoteObject(title, folder, folderColor, content, owner) {
    const dateCreated = getCurrentDate();
    const id = crypto.randomUUID()
    const note = {
        id,
        title,
        dateCreated,
        content,
        folder,
        folderColor,
        owner
    };
    addNotes(note);
    return note;
}

export function getCurrentDate() {
    const dateNow = new Date();
    const month = dateNow.getMonth() + 1;
    const day = dateNow.getDate();
    const year = dateNow.getFullYear();

    return `${month}/${day}/${year}`; // mm/dd/yyyy
}

//read for each and call createNoteComponent

//update

//delete