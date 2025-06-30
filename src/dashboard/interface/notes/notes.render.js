import '../../../style.css';
import { marked } from 'marked';
import { mainWorkspace, workspace, workspaceHeader, noteGroup } from '../components';
import { msgAlert, newFolderModal } from '../../events/alerts';
import { addFolder } from './notes-crud';

//initialize notes components
export function renderNoteComponents() {

    workspaceHeader.innerHTML="";

    //create note button
    let createBtn = document.createElement('button');
    createBtn.textContent = 'New Note';
    createBtn.classList.add('button','bg-gray-50');
    createBtn.setAttribute('id', 'createBtn');

    //create folder
    let createFolderBtn = document.createElement('button');
    createFolderBtn.textContent = 'New Folder';
    createFolderBtn.classList.add('button','bg-blue-100');
    createFolderBtn.setAttribute('id', 'createFolderBtn');
    workspaceHeader.append(createBtn);
    workspaceHeader.append(createFolderBtn);

    return {
        createBtn,
        createFolderBtn
    };

}
//render notes
function renderNotes() {
}


//events
export function noteEvents() {
    createBtn.addEventListener('click', () => {
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
}