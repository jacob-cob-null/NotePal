import { noteGroup } from "../components";
import { createFolder } from "./notes.render";

let noteGroupList = [];


export function initNoteGroup() {
    loadNoteGroupsFromLocalStorage();
    readGroupList(noteGroup);
}


export function saveNoteGroupsToLocalStorage() {
  localStorage.setItem('noteGroupList', JSON.stringify(noteGroupList));
}
export function loadNoteGroupsFromLocalStorage() {
  const saved = localStorage.getItem('noteGroupList');
  noteGroupList = saved ? JSON.parse(saved) : [];
}
//read group list
export function readGroupList(targetAppend) {
    noteGroupList.forEach((noteGroup) => {
        createFolder(noteGroup.folderName, noteGroup.color, targetAppend); // ✅ Correct props
    });
}
//Add new group list
export function addNoteGroupList(input) {
    noteGroupList.push(input);
}
//remove list item

