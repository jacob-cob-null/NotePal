import '../../../style.css';
import { addNoteGroupList, saveNoteGroupsToLocalStorage } from './note-folder';
import { newFolderModal } from '../../events/alerts';


export async function addFolder() {
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
}
//create localstorage array storing obj

//create

//read

//update

//delete