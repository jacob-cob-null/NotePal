import { noteGroup } from "../components";
import { deleteFolderModal, editFolderModal } from "../../events/alerts";
import { displayNotes } from "./notes.render";

let noteGroupList = [];

export function initFolders() {
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

export function getFolderAttributes() {
  return noteGroupList.map(folder => ({
    folderName: folder.folderName,
    color: folder.color
  }));
}
//find duplicate
export function checkDuplicate(folderName) {
  return noteGroupList.some(folder => folder.folderName === folderName);
}

//Add new group list
export function addNoteGroupList(input) {
  noteGroupList.push(input);
}

//attach listeners to folderEvents 
export function folderEvents(edit, del) {
  edit.addEventListener('click', async () => {
    const result = await editFolderModal(getFolderName(), noteGroupList);
    if (result) {
      editFolder(result);
    }
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

//edit folder
export function editFolder({ oldName, newName, newColor }) {
  const folder = noteGroupList.find(f => f.folderName === oldName);
  if (!folder) return;

  folder.folderName = newName;
  folder.color = newColor;

  folder.addEventListener('click', (newName) => {
    displayNotes(newName);
  })

  saveNoteGroupsToLocalStorage();
  refreshGroupUI();
}
export async function addFolder() {
  const input = await newFolderModal();
  if (input) {
    createFolder(input.folderName, input.color, noteGroup)
    addNoteGroupList(input);
    console.log(input);
    saveNoteGroupsToLocalStorage();
    return true;
  }
}
export function createFolder(folderName, color, targetAppend) {
  let newFolder = document.createElement('div');
  newFolder.classList.add('note-group', color, 'dark-hover-active');
  newFolder.textContent = folderName;

  newFolder.addEventListener('click', () => {
    displayNotes(folderName); // now works as intended
  });

  targetAppend.append(newFolder);
}