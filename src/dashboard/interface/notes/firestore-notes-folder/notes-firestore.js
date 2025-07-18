import { db } from "../../../../Firebase/setup";
import { setDoc, doc, query, deleteDoc, updateDoc, collection, where, getDocs } from "firebase/firestore";
import { msgAlert } from "../../../events/alerts";
//add notes
export async function addNotesFS(userId, noteId, noteTitle, noteFolder, folderColor, content, owner, dateCreated) {
    const foldersRef = collection(db, "users", userId, "folders");
    const q = query(foldersRef, where("title", "==", noteFolder));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        const folderDoc = snapshot.docs[0];
        const folderId = folderDoc.id;

        const notesRef = doc(db, "users", userId, "folders", folderId, "notes", noteId);
        await setDoc(notesRef, {
            noteTitle,
            noteFolder,
            folderColor,
            content,
            owner,
            dateCreated,
        });
        console.log("Note created")
    } else {
        msgAlert("Folder not found");
    }
}

//delete note

//get all notes
