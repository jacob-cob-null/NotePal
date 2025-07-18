import EasyMDE from "easymde";
import { marked } from 'marked';
import "easymde/dist/easymde.min.css";
import { getFolderAttributes } from "./folder-crud";
import { deleteNote, editNote, findNote } from "./notes-crud";
import { deleteConfirm, msgAlert } from "../../events/alerts";
import { createNoteObject } from "./notes-crud";
import { displayNotes } from "./notes.render";
import { noteList } from "./notes-object";
import { mainWorkspace } from "../components";
import { delNoteFS } from "./firestore-notes-folder/notes-firestore";
import { userStore } from "../../../login/user";

//create note form
export function createNoteForm(id = null, title = '', folder = '', folderColor = '', content = '') {
    //inputs
    const titleInput = document.createElement('input');
    const folderOptions = document.createElement('select');
    const textArea = document.createElement('textarea');

    // Form
    const form = document.createElement('form');
    form.classList.add('flex', 'flex-col', 'gap-3', 'items-start', 'w-full');

    // Note title
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    titleLabel.classList.add('header')

    titleInput.type = 'text';
    titleInput.classList.add('border-2', 'border-gray-500', 'w-full', 'bg-white', 'p-1.5', 'rounded-xl')
    titleInput.setAttribute('id', 'noteTitle');

    // Folder
    const folderLabel = document.createElement('label');
    folderLabel.textContent = 'Folder:';
    folderLabel.classList.add('header')

    folderOptions.classList.add('bg-white', 'p-1.5', 'rounded-xl');
    folderOptions.setAttribute('id', 'folderOption');

    //get list of folders
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

    //editing form - populate with existing values
    if (id !== null && title !== '' && folder !== '' && folderColor !== '' && content !== '') {
        titleInput.value = title;
        folderOptions.value = folder;
        textArea.value = content;
    }

    const folderGroup = document.createElement('div');
    folderGroup.classList.add('flex', 'gap-2', 'items-center')

    folderGroup.appendChild(folderLabel);
    folderGroup.appendChild(folderOptions);

    //text area
    textArea.classList.add('h-200')
    textArea.setAttribute('id', 'textArea')

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('id', 'submitBtn');
    submitBtn.textContent = id ? 'Update Note' : 'Create Note';
    submitBtn.type = 'button';

    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('id', 'cancelBtn');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.type = 'button';

    const buttonGroup = document.createElement('section');
    buttonGroup.className = 'flex gap-2 mt-auto self-end';

    submitBtn.classList.add('button', 'bg-blue-200', 'dark-hover-active');
    cancelBtn.classList.add('button', 'dark-hover-active');

    //button group
    buttonGroup.appendChild(cancelBtn);
    buttonGroup.appendChild(submitBtn);

    // Append elements to form
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(folderGroup);
    form.appendChild(textArea);
    form.appendChild(buttonGroup);

    return { form, titleInput, folderOptions, textArea, submitBtn, cancelBtn };
}

//submit button events
export function submitBtnEvent(submitBtn, titleInput, folderOptions, editor, target, id = null) {
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

        //editing existing note
        if (id !== null) {
            editNote(id, title, folder, folderColor, content);
            target.innerHTML = '';
            displayNotes();
            msgAlert(`Note "${title}" has been updated`);
            return;
        }

        // Creating new note
        const noteObject = createNoteObject(title, folder, folderColor, content);
        target.innerHTML = '';
        displayNotes();
        msgAlert(`Note "${title}" has been created`);
    });
}

//cancel button events
export function cancelBtnEvent(cancelBtn, target) {
    cancelBtn.addEventListener('click', () => {
        console.log('Cancelling operation');
        target.innerHTML = '';
        displayNotes();
    });
}

//edit note handler
function editNoteHandler(noteId) {
    const foundNote = noteList.find(n => n.id === noteId);
    if (!foundNote) {
        msgAlert('Note not found');
        return;
    }

    const { form, titleInput, folderOptions, textArea, submitBtn, cancelBtn } = createNoteForm(
        foundNote.id,
        foundNote.title,
        foundNote.folder,
        foundNote.folderColor,
        foundNote.content
    );

    mainWorkspace.innerHTML = '';
    mainWorkspace.appendChild(form);


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

    // Add styling to EasyMDE container
    const mdeContainer = textArea.parentElement?.querySelector('.EasyMDEContainer');
    if (mdeContainer) {
        mdeContainer.classList.add('w-full', 'h-full');
    }

    // Attach event listeners
    submitBtnEvent(submitBtn, titleInput, folderOptions, editor, mainWorkspace, foundNote.id);
    cancelBtnEvent(cancelBtn, mainWorkspace);
}

//attach events to delete and update button
function attachNoteEvents(note) {
    const user = userStore.getUser() //get current user
    //make each note clickable
    note.addEventListener('click', (e) => {
        const noteId = e.currentTarget.dataset.id;
        const foundNote = noteList.find(n => n.id === noteId);
        if (foundNote) {
            const view = viewNote(foundNote.id);
            mainWorkspace.innerHTML = '';
            mainWorkspace.appendChild(view);
        }
    });

    // Delete button event
    const deleteBtn = note.querySelector('.bx-trash');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const noteId = note.dataset.id;
            const foundNote = noteList.find(n => n.id === noteId);
            if (foundNote) {
                deleteConfirm(async () => {
                    await deleteDom(foundNote.id);
                    await delNoteFS(user.uid, foundNote.folder, foundNote.id)
                }, 'note');
            }
        })
    }

    // Edit button event
    const editBtn = note.querySelector('.bx-pencil-square');
    if (editBtn) {
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editNoteHandler(note.dataset.id);
        });
    }
}

//create note component 
export function createNoteComponent(title, folder, folderColor, content, dateCreated, id) {
    //container
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');

    //title section
    const noteTitleSection = document.createElement('section');
    noteTitleSection.classList.add('note-title-section');

    const noteTitle = document.createElement('h1');
    noteTitle.classList.add('note-title');
    noteTitle.textContent = title;

    const noteFolder = document.createElement('section');
    noteFolder.classList.add('note-folder', `${folderColor}`);
    noteFolder.textContent = folder;

    //append title and folder
    noteTitleSection.appendChild(noteTitle);
    noteTitleSection.appendChild(noteFolder);

    //main content
    const noteBody = document.createElement('div');
    noteBody.className = 'markdown w-full break-words whitespace-pre-wrap overflow-y-auto text-sm leading-relaxed';
    noteBody.innerHTML = marked(content);

    //button section
    const noteBtnSection = document.createElement('section');
    noteBtnSection.classList.add('note-btn-section');

    //date
    const noteDate = document.createElement('p');
    noteDate.textContent = `Created on ${dateCreated}`;
    noteDate.classList.add('noteDate')

    const btnDiv = document.createElement('div');
    const deleteBtn = document.createElement('i');
    deleteBtn.className = 'bx bx-trash note-btn text-red-400';
    const editBtn = document.createElement('i');
    editBtn.className = 'bx bx-pencil-square note-btn';

    //append buttons
    btnDiv.appendChild(deleteBtn);
    btnDiv.appendChild(editBtn);

    //append date and buttons
    noteBtnSection.appendChild(noteDate);
    noteBtnSection.appendChild(btnDiv);

    noteContainer.appendChild(noteTitleSection);
    noteContainer.appendChild(noteBody);
    noteContainer.appendChild(noteBtnSection);

    //set id and attach events
    if (id) {
        noteContainer.dataset.id = id;
        attachNoteEvents(noteContainer);
    }

    return noteContainer;
}

//view note
function viewNote(id) {
    const note = findNote(id);
    if (!note) {
        msgAlert('Note not found');
        return document.createElement('div');
    }

    //components
    const viewContainer = document.createElement('div');
    viewContainer.className = 'rounded-2xl bg-white w-full h-full flex flex-col px-5 py-4 border-1 border-gray-200';

    const upperSection = document.createElement('section');
    upperSection.className = 'flex  justify-between items-center';

    const title = document.createElement('h1');
    title.className = 'note-title text-xl sm:text-4xl w-full h-14 mt-5.5';
    title.textContent = note.title;

    const folder = document.createElement('span');
    folder.className = `note-folder w-35 ${note.folderColor}`;
    folder.textContent = note.folder;

    const date = document.createElement('h1');
    date.className = 'note-date text-xl  text-gray-400';
    date.textContent = note.dateCreated;

    //append to upperSection
    upperSection.appendChild(title);
    upperSection.appendChild(folder);

    const line = document.createElement('hr');
    line.className = 'w-full h-[3px] my-2 md-col border-none mb-8 rounded-sm bg-gray-900';

    const content = document.createElement('div');
    content.className = 'h-full w-full overflow-auto markdown';
    content.innerHTML = marked(note.content);

    //buttons
    const editButton = document.createElement('button');
    editButton.classList.add('button', 'dark-hover-active', 'bg-blue-200');
    editButton.innerHTML = '<i class="bx bx-pencil-square"></i> Edit';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button', 'dark-hover-active', 'bg-red-200');
    deleteButton.innerHTML = '<i class="bx bx-trash"></i> Delete';

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('button', 'dark-hover-active');
    cancelButton.textContent = 'Back';

    const btnGroup = document.createElement('section');
    btnGroup.className = 'flex gap-2 mt-4 items-end justify-end sm:grid sm:auto-cols-min sm:grid-flow-col';

    btnGroup.appendChild(cancelButton);
    btnGroup.appendChild(editButton);
    btnGroup.appendChild(deleteButton);

    // Event listeners
    editButton.addEventListener('click', () => {
        editNoteHandler(note.id);
    });
    //DELETE
    deleteButton.addEventListener('click', () => {
        deleteConfirm(async () => {
            await deleteDom(note.id);
        }, 'note');
    });

    cancelButton.addEventListener('click', () => {
        mainWorkspace.innerHTML = '';
        displayNotes();
    });

    viewContainer.appendChild(upperSection);
    viewContainer.appendChild(date);
    viewContainer.appendChild(line);
    viewContainer.appendChild(content);
    viewContainer.appendChild(btnGroup);

    return viewContainer;
}

function deleteDom(id) {
    deleteNote(id); // remove from noteList and/or storage
    mainWorkspace.innerHTML = '';
    displayNotes(); // re-render remaining notes
}