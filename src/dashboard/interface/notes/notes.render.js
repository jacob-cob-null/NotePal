import '../../../style.css';
import { marked } from 'marked';
import { mainWorkspace, workspace, workspaceHeader } from '../components';
import { msgAlert } from '../../events/alerts';

//initialize notes components
export function renderNoteComponents() {

    //create button
    let createBtn = document.createElement('button');
    createBtn.textContent = 'New Note';
    createBtn.classList.add('h-10', 'w-26', 'bg-accent', 'rounded-xl', 'text-white', 'font-head');
    createBtn.setAttribute('id', 'createBtn');
    let createFolderBtn = document.createElement('button');
    createFolderBtn.textContent = 'New Folder';
    createFolderBtn.classList.add('h-10', 'w-26', 'bg-accent', 'rounded-xl', 'text-white', 'font-head');
    createFolderBtn.setAttribute('id', 'createFolderBtn');
    workspaceHeader.append(createBtn);
    workspaceHeader.append(createFolderBtn);

    return createBtn;
}
//render notes
function renderNotes() {


}
//render input for note update

//events
export function noteEvents() {
    createBtn.addEventListener('click', () => {
        createNote();
    })
    createFolderBtn.addEventListener('click', () => {
        msgAlert("New Folder Created")
    });
}

//render input for note creation
function createNote() {
    msgAlert("Note Created")
    mainWorkspace.innerHTML = '';
    const form = document.createElement('form');
    form.classList.add('flex', 'flex-col', 'gap-5', 'items-start')

}
