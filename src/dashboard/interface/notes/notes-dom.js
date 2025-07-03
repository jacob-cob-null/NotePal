import EasyMDE from "easymde";
import { marked } from 'marked';
import "easymde/dist/easymde.min.css";
import { getFolderAttributes } from "./folder-crud";
import { deleteNote, findNote, getCurrentDate } from "./notes-crud";
import { msgAlert } from "../../events/alerts";
import { createNoteObject } from "./notes-crud";
import { displayNotes } from "./notes.render";
import { noteList } from "./notes-object";
import { mainWorkspace } from "../components";


//create note form
export function createNoteForm() {
    // Form
    const form = document.createElement('form');
    form.classList.add('flex', 'flex-col', 'gap-3', 'items-start', 'w-full');

    // Note title
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    titleLabel.classList.add('header')

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.classList.add('border-2', 'border-gray-500', 'w-full', 'bg-white', 'p-1.5', 'rounded-xl')
    titleInput.setAttribute('id', 'noteTitle');

    // Folder
    const folderLabel = document.createElement('label');
    folderLabel.textContent = 'Folder:';
    folderLabel.classList.add('header')
    const folderOptions = document.createElement('select');
    folderOptions.classList.add('bg-white', 'p-1.5', 'rounded-xl');
    folderOptions.setAttribute('id', 'folderOption');
    //get folders
    const folderAttributes = getFolderAttributes();

    // iterate folder attributes
    folderAttributes.forEach(folder => {
        const option = document.createElement('option');
        option.value = folder.folderName; //folder name
        option.textContent = folder.folderName;
        option.classList.add('folder-option', `${folder.color}`);
        option.dataset.color = folder.color; //color
        folderOptions.appendChild(option);
    });

    const folderGroup = document.createElement('div');
    folderGroup.classList.add('flex', 'gap-2', 'items-center')

    folderGroup.appendChild(folderLabel);
    folderGroup.appendChild(folderOptions);

    //text area
    const textArea = document.createElement('textarea');
    textArea.classList.add('h-200')
    textArea.setAttribute('id', 'textArea')

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('id', 'submitBtn');
    submitBtn.textContent = 'Create Note';
    submitBtn.type = 'button';


    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('id', 'cancelBtn');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.type = 'button'; // prevents form submission refresh

    const buttonGroup = document.createElement('section');
    buttonGroup.classList.add('flex', 'gap-2', 'mt-auto', 'self-end');

    submitBtn.classList.add('button', 'hover:bg-blue-200', 'hover:shadow-lg');
    cancelBtn.classList.add('button', 'hover:bg-red-200', 'hover:shadow-lg');

    //button group
    buttonGroup.appendChild(cancelBtn);
    buttonGroup.appendChild(submitBtn);

    // Append elements to form
    form.appendChild(titleLabel);
    form.appendChild(titleInput); //noteTitle
    form.appendChild(folderGroup); //folderOption
    form.appendChild(textArea); //textArea
    form.appendChild(buttonGroup); //cancelBtn and submitBtn

    return { form, titleInput, folderOptions, textArea, submitBtn, cancelBtn }; //returns form (to append), and input values (title, folder, content), and cancel and create note button
}

//submit button events
export function submitBtnEvent(submitBtn, titleInput, folderOptions, editor, target) {
    submitBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const folder = folderOptions.value;
        const content = editor.value();
        const selectedOption = folderOptions.options[folderOptions.selectedIndex];
        const folderColor = selectedOption.dataset.color || 'bg-gray-200';

        if (!title || !content || !folder) {
            msgAlert('Please fill out all fields');
            return;
        }
        const note = createNoteComponent(title, folder, folderColor, content, getCurrentDate());
        createNoteObject(title, folder, folderColor, content, 'placeholder');

        target.innerHTML = '';
        //TODO:: RERENDER ALL NOTES
        attachNoteEvents(note);
        target.appendChild(note);
        displayNotes();

    });

}
//attach events to delete and update button
function attachNoteEvents(note) {

    note.addEventListener('click', (e) => {
        const noteId = e.currentTarget.dataset.id;
        const foundNote = noteList.find(n => n.id === noteId);
        if (foundNote) {
            const view = viewNote(foundNote.id);
            mainWorkspace.innerHTML = '';
            mainWorkspace.appendChild(view)
        }
    });

    note.querySelector('.bx-trash')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const noteId = note.dataset.id;
        const foundNote = noteList.find(n => n.id === noteId);
        if (foundNote) {
            const toDelete = foundNote.id;
            deleteNote(toDelete); //delete to localstorage
            note.remove();
        }

    });
    note.querySelector('.bx-pencil-square')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const noteId = note.dataset.id;
        const foundNote = noteList.find(n => n.id === noteId);
        if (foundNote) {

            msgAlert(foundNote.id)
        }

    });
}

//cancel button events
export function cancelBtnEvent(cancelBtn, target) {
    cancelBtn.addEventListener('click', () => {
        console.log('I cancel things!');
        target.innerHTML = '';
        displayNotes();

    });
}


//create note component 
export function createNoteComponent(title, folder, folderColor, content, dateCreated, id) {

    //container
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');

    //title section
    const noteTitleSection = document.createElement('section');
    noteTitleSection.classList.add('note-title-section')
    const noteTitle = document.createElement('h1');
    noteTitle.classList.add('note-title');
    noteTitle.textContent = title;//title

    const noteFolder = document.createElement('section')
    noteFolder.classList.add('note-folder', `${folderColor}`)
    noteFolder.textContent = folder;

    //append title and folder
    noteTitleSection.appendChild(noteTitle);
    noteTitleSection.appendChild(noteFolder);

    //main content
    const noteBody = document.createElement('div');
    noteBody.classList.add('note-body');
    noteBody.innerHTML = marked(content); //parsed to html

    //button section
    const noteBtnSection = document.createElement('section');
    noteBtnSection.classList.add('note-btn-section');

    //date
    const noteDate = document.createElement('p')
    noteDate.textContent = `Created on ${dateCreated}`;

    const btnDiv = document.createElement('div')
    const deleteBtn = document.createElement('i');
    deleteBtn.className = 'bx bx-trash note-btn text-red-400';
    const editBtn = document.createElement('i');
    editBtn.className = 'bx bx-pencil-square note-btn';

    //append buttons
    btnDiv.appendChild(deleteBtn)
    btnDiv.appendChild(editBtn)

    //append date and buttons
    noteBtnSection.appendChild(noteDate);
    noteBtnSection.appendChild(btnDiv);

    noteContainer.appendChild(noteTitleSection);
    noteContainer.appendChild(noteBody);
    noteContainer.appendChild(noteBtnSection);

    //return note container and append to mainWorkspace

    noteContainer.dataset.id = id;
    attachNoteEvents(noteContainer);
    return noteContainer;
}
//view note
function viewNote(id) {
    const note = findNote(id);

    //components
    const viewContainer = document.createElement('div');
    viewContainer.className = 'rounded-2xl bg-white w-full h-full flex flex-col px-5 py-4';

    const upperSection = document.createElement('section');
    upperSection.className = 'flex justify-between items-center';

    const title = document.createElement('h1');
    title.className ='note-title text-5xl w-full';
    title.textContent = note.title;
    const folder = document.createElement('span');
    folder.className = `note-folder w-35 ${note.folderColor}`;
    folder.textContent = note.folder;

    const date = document.createElement('h1');
    date.className = 'note-date text-xl'
    date.textContent = note.dateCreated;

    //append to upperSection
    upperSection.appendChild(title);
    upperSection.appendChild(folder);

    const line = document.createElement('hr');
    line.className = 'w-full h-[3px] my-2 md-col border-none mb-8 rounded-sm bg-gray-900'

    const content = document.createElement('div');
    content.className = 'h-full w-full overflow-auto';
    content.innerHTML = marked(note.content)

    viewContainer.appendChild(upperSection);
    viewContainer.appendChild(date);
    viewContainer.appendChild(line);
    viewContainer.appendChild(content);

    return viewContainer;

}
//edit note


