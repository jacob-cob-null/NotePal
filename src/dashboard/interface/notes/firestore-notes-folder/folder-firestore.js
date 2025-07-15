import { db } from "../../../../Firebase/setup";
import { setDoc, doc } from "firebase/firestore";

//create initial folder and note collection
export async function initFoldersCollection(userId) {
    try {
        //initial folder
        const folderId = 'FOLDER' + crypto.randomUUID();
        const folderRef = doc(db, "users", userId, "folders", folderId)
        await setDoc(folderRef, {
            id: folderId,
            title: "Default Folder",
            color: "red"
        });
        console.log("Folder created")

        //initial note
        const noteId = 'NOTE' + crypto.randomUUID();
        const noteRef = doc(db, "users", userId, "folders", folderId, "notes", noteId)
        await setDoc(noteRef, {
            id: noteId,
            title: "Default Note",
            content: "Default Content",
            dateCreated: Date.now(),
            folder: "Default Folder",
            folderColor: "red",
            owner: userId
        });
        console.log("Default note created")
    } catch (err) {

    }
}
//create folder
export async function createFolderFS(userId, id, name, color) {
    try {
        const folderRef = doc(db, "users", userId, "folders", id)
        await setDoc(folderRef, {
            id: id,
            title: name,
            color: color
        });
        console.log("Folder created and saved in firestore")

        //default note
        const noteId = 'NOTE' + crypto.randomUUID();
        const noteRef = doc(db, "users", userId, "folders", id, "notes", noteId)
        await setDoc(noteRef, {
            id: noteId,
            title: "Default Note",
            content: "Default Content",
            dateCreated: Date.now(),
            folder: "Default Folder",
            folderColor: "red",
            owner: userId
        });
        console.log("Default note created")
    } catch (err) {
        console.log(err)
    }



}