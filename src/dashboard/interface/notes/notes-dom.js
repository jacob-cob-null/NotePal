import EasyMDE from "easymde";
import { marked } from 'marked';
import "easymde/dist/easymde.min.css";
import { getFolderAttributes } from "./folder-crud";
import { getCurrentDate } from "./notes-crud";

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
export function submitBtnEvent(submitBtn) {
    submitBtn.addEventListener('click', () => {
        console.log('I worked!')
    });
}
//cancel button events
export function cancelBtnEvent(cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        console.log('I cancel things!')
    });
}


//create note component 
export function createNoteComponent(title, folder, folderColor, content, date) {

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
    const dateCreated = getCurrentDate();
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
    return noteContainer;
}

