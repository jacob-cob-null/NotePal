import { noteGroup } from "../components";
import { deleteConfirm, deleteFolderModal, editFolderModal } from "../../events/alerts";
import { displayNotes } from "./notes.render";
import { delFolderFS, getAllFoldersFS, updateFolderFS } from "./firestore-notes-folder/folder-firestore";
import { userStore } from "../../../login/user";

let noteGroupList = [];

export async function initFolders(userId) {
  await loadNoteGroupsFromLocalStorage(userId);
  await readGroupList(noteGroup);
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
export async function loadNoteGroupsFromLocalStorage(userId = null) {
  if (userId) {
    try {
      const folderFS = await getAllFoldersFS(userId);
      console.log('Folders from Firestore:', folderFS);

      if (folderFS && folderFS.length > 0) {
        // 🔥 convert Firestore `title` to local `folderName`
        noteGroupList = folderFS.map(folder => ({
          id: folder.id,
          folderName: folder.title,
          color: folder.color
        }));
        localStorage.setItem('noteGroupList', JSON.stringify(noteGroupList));
        return noteGroupList;
      }
    } catch (error) {
      console.error('Error loading from Firestore:', error);
    }
  }
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
export async function folderEvents(edit, del) {
  const user = userStore.getUser()
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
        await delFolderFS(user.uid, folderToDelete)
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
export async function editFolder({ oldName, newName, newColor }) {
  const user = userStore.getUser()
  const folder = noteGroupList.find(f => f.folderName === oldName);
  if (!folder) return; //if blank

  folder.folderName = newName;
  folder.color = newColor;
  await updateFolderFS(user.uid, oldName, newName, newColor)

  saveNoteGroupsToLocalStorage();
  refreshGroupUI();
}
export async function addFolder() {
  const input = await newFolderModal();
  if (input) {
    const folderId = 'FOLDER-' + crypto.randomUUID();

    const newFolderData = { id: folderId, folderName: input.folderName, color: input.color };
    addNoteGroupList(newFolderData);
    createFolder(newFolderData.id, newFolderData.folderName, newFolderData.color, noteGroup);
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