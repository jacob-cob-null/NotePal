import '../../../style.css';
import EasyMDE from 'easymde';

//note object factory
export function createNoteObject(title, content, folder, owner) {
    const dateCreated = getCurrentDate();
    return {
        title,
        dateCreated,
        content,
        folder,
        owner
    };
}

export function getCurrentDate() {
    const dateNow = new Date();
    const month = dateNow.getMonth() + 1;
    const day = dateNow.getDate();
    const year = dateNow.getFullYear();

    return `${month}/${day}/${year}`; // mm/dd/yyyy
}

//read for each and call createNoteComponent

//update

//delete