import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { getFolderAttributes } from "./folder-crud";

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
    titleInput.classList.add('border-2', 'border-gray-500', 'w-full', 'bg-white', 'p-2', 'rounded-xl')

    // Folder
    const folderLabel = document.createElement('label');
    folderLabel.textContent = 'Folder';
    const folderOptions = document.createElement('select');
    const folderAttributes = getFolderAttributes();

    // iterate folder attributes
    folderAttributes.forEach(folder => {
        const option = document.createElement('option');
        option.value = folder.folderName;
        option.textContent = folder.folderName;
        option.classList.add('folder-option', `${folder.color}`);
        folderOptions.appendChild(option);
    });

    //text area
    const textArea = document.createElement('textarea');

    // Append elements to form
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(folderLabel);
    form.appendChild(folderOptions);
    form.appendChild(textArea);


    console.log(folderOptions)

    return {form, textArea}; //creates form and preps textarea to be appended
}

//submit note, take input from note form
