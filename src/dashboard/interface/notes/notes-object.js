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
export function loadNotesFromLocalStorage() {
  const saved = localStorage.getItem('noteList');
  noteList = saved ? JSON.parse(saved) : [];
}
