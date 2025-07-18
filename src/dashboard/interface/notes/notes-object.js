import { getAllNotesFS } from "./firestore-notes-folder/notes-firestore";
import { msgAlert } from "../../events/alerts";
export let noteList = []

//add to notes array
export function addNotes(note) {
  noteList.push(note);
  saveNotesToLocalStorage();
}
//save to local storage
export function saveNotesToLocalStorage() {
  localStorage.setItem('noteList', JSON.stringify(noteList));
}
//load from localStorage
export async function loadNotesFromLocalStorage(userId = null) {
  if (userId) {
    try {
      const notesFS = await getAllNotesFS(userId);
      console.log('Notes from Firestore:', notesFS);

      if (notesFS && notesFS.length > 0) {
        noteList = notesFS.map(note => ({
          id: note.id,
          title: note.title,
          dateCreated: note.dateCreated,
          content: note.content,
          folder: note.folder,
          folderColor: note.folderColor,
          owner: note.owner,
        }));
        console.log("Loaded notes!")
        localStorage.setItem('noteList', JSON.stringify(noteList));
        return noteList;
      }
    } catch (error) {
      msgAlert('Error loading notes from Firestore.');
      console.error('Firestore Notes Error:', error);
    }
  }
}