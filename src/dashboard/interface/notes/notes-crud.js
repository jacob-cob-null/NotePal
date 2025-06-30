import '../../../style.css';

//note object factory
function createNote(title, dateCreated, content, owner){
    var dateNow = new Date();
    let month = dateNow.getMonth()+1;
    let day = dateNow.getDate;
    const year = dateNow.getFullYear();
    
    dateCreated = `${month} ${day}, ${year}`;
    return {
        title: title, dateCreated: dateCreated, content: content, owner: owner
    }
}

//create

//read

//update

//delete