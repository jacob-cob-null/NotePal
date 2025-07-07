import '../../../style.css';
import { addNotes, noteList, saveNotesToLocalStorage } from './notes-object';

//note object factory
export function createNoteObject(title, folder, folderColor, content, owner = 'placeholder') {
    const dateCreated = getCurrentDate();
    const id = crypto.randomUUID(); // Generate unique ID
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
export function editNote(id, title, folder, folderColor, content) {
    noteList.forEach((note) => {
        if (note.id == id) {
            note.title = title;
            note.folder = folder;
            note.folderColor = folderColor;
            note.content = content;
            saveNotesToLocalStorage();
        }
    })
}

//delete
export function deleteNote(id) {
    const originalLength = noteList.length;
    const filteredNotes = noteList.filter(note => note.id !== id);

    if (filteredNotes.length < originalLength) {
        noteList.length = 0; // Clear the array
        noteList.push(...filteredNotes); // Add filtered notes back
        saveNotesToLocalStorage();
    }
}

//search note
export function findNote(id) {
    return noteList.find(note => note.id === id);
}