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
        option.value = folder.folderName;
        option.textContent = folder.folderName;
        option.classList.add('folder-option', `${folder.color}`);
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
    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('id', 'cancelBtn');
    cancelBtn.textContent = 'Cancel'

    const buttonGroup = document.createElement('section');
    buttonGroup.classList.add('flex', 'gap-2', 'mt-auto', 'self-end');

    submitBtn.classList.add('button');
    cancelBtn.classList.add('button', 'hover:bg-red-200', 'hover:shadow-lg');

    //button group
    buttonGroup.appendChild(cancelBtn);
    buttonGroup.appendChild(submitBtn);

    // Append elements to form
    form.appendChild(titleLabel);
    form.appendChild(titleInput); //noteTitle
    form.appendChild(folderGroup);
    form.appendChild(textArea); //textArea
    form.appendChild(buttonGroup); //cancelBtn and submitBtn

    return { form, textArea }; //creates form and preps textarea to be appended

}

