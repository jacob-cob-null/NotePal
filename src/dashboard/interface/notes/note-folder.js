import { noteGroup } from "../components";
import { createFolder } from "./notes.render";
import { deleteFolderModal } from "../../events/alerts";

let noteGroupList = [];

export function initNoteGroup() {
  loadNoteGroupsFromLocalStorage();
  readGroupList(noteGroup);
}
//refresh note groups
function refreshGroupUI() {
  noteGroup.innerHTML = '';
  readGroupList(noteGroup);
}


//save to local storage
export function saveNoteGroupsToLocalStorage() {
  localStorage.setItem('noteGroupList', JSON.stringify(noteGroupList));
}
//load from localStorage
export function loadNoteGroupsFromLocalStorage() {
  const saved = localStorage.getItem('noteGroupList');
  noteGroupList = saved ? JSON.parse(saved) : [];
}

//read group list
export function readGroupList(targetAppend) {
  noteGroupList.forEach((noteGroup) => {
    createFolder(noteGroup.folderName, noteGroup.color, targetAppend);
  });
}
//return all folder name
function getFolderName() {
  return Object.fromEntries(
    noteGroupList.map(folder => [folder.folderName, folder.folderName])
  );
}

//Add new group list
export function addNoteGroupList(input) {
  noteGroupList.push(input);
}


//attach listeners to folderEvents 
export function folderEvents(edit, del) {
  edit.addEventListener('click', () => {
    //edit logic
  });
  del.addEventListener('click', async () => {
    const folderToDelete = await deleteFolderModal(getFolderName());
    if (folderToDelete) {
      removeFolder(folderToDelete);
    }
  });
}

//remove list item
export function removeFolder(folderToDelete) {
  noteGroupList = noteGroupList.filter(folder => folder.folderName !== folderToDelete);
  saveNoteGroupsToLocalStorage();
  refreshGroupUI();
}