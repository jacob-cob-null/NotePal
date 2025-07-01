import '../../../style.css';
import { marked } from 'marked';
import { mainWorkspace, workspace, workspaceHeader, noteGroup } from '../components';
import { msgAlert, newFolderModal } from '../../events/alerts';
import { addNoteGroupList, checkDuplicate, saveNoteGroupsToLocalStorage } from './folder-crud.js';

//initialize notes components
export function renderNoteComponent() {
    workspaceHeader.innerHTML = "";
    noteGroup.innerHTML = "";

    //create buttons
    let createNoteBtn = document.createElement('button');
    createNoteBtn.textContent = 'New Note';
    createNoteBtn.classList.add('button', 'bg-white');
    createNoteBtn.setAttribute('id', 'createNoteBtn');

    let createFolderBtn = document.createElement('button');
    createFolderBtn.textContent = 'New Folder';
    createFolderBtn.classList.add('button', 'bg-blue-100');
    createFolderBtn.setAttribute('id', 'createFolderBtn');

    workspaceHeader.append(createNoteBtn);
    workspaceHeader.append(createFolderBtn);

    return {
        createNoteBtn,
        createFolderBtn
    };
}

//render input for note creation
function createNote() {
    alert("Note Created");
    mainWorkspace.innerHTML = '';
    const form = document.createElement('form');
    form.classList.add('flex', 'flex-col', 'gap-5', 'items-start');

}

//create and append folder
async function addFolder() {
    const input = await newFolderModal();
    if (input) {
        createFolder(input.folderName, input.color, noteGroup);
        addNoteGroupList(input);
        saveNoteGroupsToLocalStorage();
        return true;
    }
}

//creates a DOM folder
export function createFolder(folderName, color, targetAppend) {
    let newFolder = document.createElement('div');
    newFolder.classList.add('note-group', `${color}`, 'dark-hover-active');
    newFolder.textContent = folderName;
    targetAppend.append(newFolder);
}

//bind events
export function noteEvents() {
    document.getElementById('createNoteBtn').addEventListener('click', () => {
        createNote();
    });

    document.getElementById('createFolderBtn').addEventListener('click', async () => {
        try {
            if (await addFolder()) {
                msgAlert("Folder Created");
            }
        } catch {
            msgAlert("Folder Not Created");
        }
    });
}
