import '../../../style.css';
import { marked } from 'marked';
import { mainWorkspace, workspace, workspaceHeader, noteGroup } from '../components';
import { msgAlert, newFolderModal } from '../../events/alerts';
<<<<<<< HEAD
import { addFolder } from './notes-crud';
=======
import { addNoteGroupList, checkDuplicate, saveNoteGroupsToLocalStorage } from './note-folder';
>>>>>>> f787496 (add function to block duplicate in folder creation)

//initialize notes components
export function renderNoteComponent() {

    workspaceHeader.innerHTML="";
    noteGroup.innerHTML="";

<<<<<<< HEAD
    //create note button
    let createBtn = document.createElement('button');
    createBtn.textContent = 'New Note';
    createBtn.classList.add('button','bg-gray-50');
    createBtn.setAttribute('id', 'createBtn');
=======
    //create button
    let createNoteBtn = document.createElement('button');
    createNoteBtn.textContent = 'New Note';
    createNoteBtn.classList.add('button','bg-white');
    createNoteBtn.setAttribute('id', 'createNoteBtn');
>>>>>>> f787496 (add function to block duplicate in folder creation)

    //create folder
    let createFolderBtn = document.createElement('button');
    createFolderBtn.textContent = 'New Folder';
    createFolderBtn.classList.add('button','bg-blue-100');
    createFolderBtn.setAttribute('id', 'createFolderBtn');
    workspaceHeader.append(createNoteBtn);
    workspaceHeader.append(createFolderBtn);

    return {
        createNoteBtn,
        createFolderBtn
    };

}
//render notes
function renderNotes() {
}


//events
export function noteEvents() {
    createNoteBtn.addEventListener('click', () => {
        //render all notes
        //render according to folder
        createNote();
    })
    createFolderBtn.addEventListener('click', async () => {
        try {
            if (await addFolder()) {
                msgAlert("Folder Created");
            }
        }
        catch {
            msgAlert("Folder Not Created");
        }
    });
}

//render input for note creation
function createNote() {
    alert("Note Created");
    mainWorkspace.innerHTML = '';
    const form = document.createElement('form');
    form.classList.add('flex', 'flex-col', 'gap-5', 'items-start')
<<<<<<< HEAD
=======

}
async function addFolder() {
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
    newFolder.classList.add('note-group', `${color}`);
    newFolder.textContent = folderName;
    targetAppend.append(newFolder);
>>>>>>> f787496 (add function to block duplicate in folder creation)
}