import '../../../style.css';
import EasyMDE from 'easymde';

//note object factory
function createNote(title, content, folder, owner) {
    var dateNow = new Date();
    let month = dateNow.getMonth() + 1;
    let day = dateNow.getDate();
    const year = dateNow.getFullYear();

    //when note was made
    dateCreated = `${month} ${day}, ${year}`;
    return {
        title, dateCreated, content, folder, owner
    };
}

//read

//update

//delete