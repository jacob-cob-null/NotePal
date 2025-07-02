import '../../../style.css';
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { workspaceHeader, noteGroup, mainWorkspace } from '../components';
import { msgAlert, newFolderModal } from '../../events/alerts';
import { addNoteGroupList, saveNoteGroupsToLocalStorage, initFolders } from './folder-crud.js';
import { createNoteForm } from './notes-dom.js';
import { submitBtnEvent, cancelBtnEvent } from './notes-dom.js';


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

//render primary note components
export function initNotes() {
    renderNoteComponent();
    noteEvents();
    initFolders();
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

    //CREATE NOTE FORM
    document.getElementById('createNoteBtn').addEventListener('click', () => {
        mainWorkspace.innerHTML = ''; //clears mainWorkspace
        const { form, titleInput, folderOptions, textArea, submitBtn, cancelBtn  } = createNoteForm();
        mainWorkspace.append(form); //appends form

        //easy mde  
        const editor = new EasyMDE({ element: textArea });
        const mdeContainer = textArea.parentElement?.querySelector('.EasyMDEContainer');
        if (mdeContainer) {
            mdeContainer.classList.add('w-full');
        }

        submitBtnEvent(submitBtn, titleInput, folderOptions, editor, mainWorkspace);
        cancelBtnEvent(cancelBtn, mainWorkspace);

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
