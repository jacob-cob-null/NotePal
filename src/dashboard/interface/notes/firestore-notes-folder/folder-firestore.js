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
            dateCreated: Date.now(),
            folder: "Default Folder",
            folderColor: "red",
            owner: userId
        });
        console.log("Default note created")
    } catch (err) {

    }
}