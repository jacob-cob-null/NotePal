import { noteGroup } from "../components";
import { deleteConfirm, deleteFolderModal, editFolderModal } from "../../events/alerts";
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
  noteGroupList.forEach((folderData) => {
    createFolder(folderData.id, folderData.folderName, folderData.color, targetAppend);
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
      deleteConfirm(async () => {
        await removeFolder(folderToDelete);
      }, 'folder');
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
  const input = await newFolderModal(); // input likely contains { folderName, color }
  if (input) {
    const folderId = 'FOLDER-' + crypto.randomUUID();
    // Add the id to the input object before adding it to the list
    const newFolderData = { id: folderId, folderName: input.folderName, color: input.color };
    addNoteGroupList(newFolderData); // This will push the object with id, folderName, color
    createFolder(newFolderData.id, newFolderData.folderName, newFolderData.color, noteGroup); // Also pass correct args here
    console.log(newFolderData);
    saveNoteGroupsToLocalStorage();
    return true;
  }
}
export function createFolder(id, folderName, color, targetAppend) {
  let newFolder = document.createElement('div');
  newFolder.classList.add('note-group', `${String(color)}`, 'dark-hover-active');
  newFolder.id = id;
  newFolder.textContent = folderName;

  newFolder.addEventListener('click', () => {
    displayNotes(folderName);
  });

  targetAppend.append(newFolder);
}