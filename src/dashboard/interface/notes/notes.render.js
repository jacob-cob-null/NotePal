import '../../../style.css';
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { workspaceHeader, noteGroup, mainWorkspace } from '../components';
import { msgAlert, newFolderModal } from '../../events/alerts';
import { addNoteGroupList, saveNoteGroupsToLocalStorage, initFolders } from './folder-crud.js';
import { createNoteForm } from './notes-dom.js';
import { submitBtnEvent, cancelBtnEvent } from './notes-dom.js';
import { createNoteObject } from './notes-crud.js';
import { noteList, loadNotesFromLocalStorage } from './notes-object.js';
import { createNoteComponent } from './notes-dom.js';

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
        mainWorkspace.innerHTML = '';
        const { form, titleInput, folderOptions, textArea, submitBtn, cancelBtn } = createNoteForm();
        mainWorkspace.append(form);

        //easy mde  
        const editor = new EasyMDE({
            element: textArea,
            toolbar: [
                "bold", "italic", "heading", "|",
                "quote", "unordered-list", "ordered-list", "|",
                "code", "link", "image", "|",
                "preview", "side-by-side", "fullscreen", "|",
                {
                },
            ],
        });
        const mdeContainer = textArea.parentElement?.querySelector('.EasyMDEContainer');
        if (mdeContainer) {
            mdeContainer.classList.add('w-full', 'h-full');
        }
        submitBtnEvent(submitBtn, titleInput, folderOptions, editor, mainWorkspace, null);
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
//iterate through notes and append through mainWorkspace
export function displayNotes(folder) {

    //if argument not empty, iterate list of note's folder
    if (folder != null) {
        mainWorkspace.innerHTML = ''
        loadNotesFromLocalStorage();

        //filters notes with specific folder, if empty, appends a text
        const filteredNoteList = noteList.filter((note) => note.folder?.toLowerCase() === folder?.toLowerCase());
        if (filteredNoteList.length === 0) {
            const emptyWorkspace = document.createElement('h1');
            emptyWorkspace.classList.add('header');
            emptyWorkspace.textContent = 'This folder seems to be empty, try adding notes here!'
            mainWorkspace.appendChild(emptyWorkspace);
            return;
        }
        filteredNoteList.forEach((note) => {
            const safeContent = typeof note.content === 'string' ? note.content : '';

            if (!note.content) {
                console.warn('Note with missing content detected:', note);
            }
            const noteItem = createNoteComponent(note.title, note.folder, note.folderColor, note.content, note.dateCreated, note.id) //creates note
            mainWorkspace.appendChild(noteItem);
        })
        return;
    }
    mainWorkspace.innerHTML = ''
    loadNotesFromLocalStorage();
    noteList.forEach((note) => {

        const safeContent = typeof note.content === 'string' ? note.content : '';

        if (!note.content) {
            console.warn('Note with missing content detected:', note);
        }
        const noteItem = createNoteComponent(note.title, note.folder, note.folderColor, note.content, note.dateCreated, note.id) //creates note
        mainWorkspace.appendChild(noteItem);
    })

}