import '../../../style.css';
import { addNotes, noteList, saveNotesToLocalStorage } from './notes-object';
import { getCurrentDate } from '../../events/util';
import { addNotesFS, updateNoteFS } from './firestore-notes-folder/notes-firestore';
import { userStore } from '../../../login/user';

//note object factory
export async function createNoteObject(title, folder, folderColor, content, owner = 'placeholder') {
    const user = userStore.getUser() //get current user
    const dateCreated = getCurrentDate();
    const id = "NOTE" + crypto.randomUUID(); // Generate unique ID
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
    await addNotesFS(user.uid, id, title, folder, folderColor, content, owner, dateCreated)
    return note;
}

//read for each and call createNoteComponent

//update
export async function editNote(id, title, folder, folderColor, content) {
    const user = userStore.getUser();
    noteList.forEach(async (note) => {
        if (note.id == id) {
            const oldFolder = note.folder;
            const oldFolderColor = note.folderColor;
            note.title = title;
            note.folder = folder;
            note.folderColor = folderColor;
            note.content = content;
            if (oldFolder !== folder) {
                // Folder changed: delete from old folder, add to new folder
                await import('./firestore-notes-folder/notes-firestore').then(async (fs) => {
                    await fs.delNoteFS(user.uid, oldFolder, id);
                    await fs.addNotesFS(user.uid, id, title, folder, folderColor, content, note.owner || 'placeholder', note.dateCreated || '');
                });
                console.log("Moved note to new folder in Firestore!");
            } else {
                updateNoteFS(user.uid, id, title, folder, folderColor, content); //firestore
                console.log("Updated locally and firestore!");
            }
            saveNotesToLocalStorage();
        }
    });
}

//delete
export function deleteNote(id) {
    const originalLength = noteList.length;
    const filteredNotes = noteList.filter(note => note.id !== id);

    if (filteredNotes.length < originalLength) {
        noteList.length = 0;
        noteList.push(...filteredNotes); // Add filtered notes back
        saveNotesToLocalStorage();
    }
}

//search note
export function findNote(id) {
    return noteList.find(note => note.id === id);
}