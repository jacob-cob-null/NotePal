import { db } from "../../../../Firebase/setup";
import { setDoc, doc, query, deleteDoc, updateDoc, collection, collectionGroup, where, getDocs } from "firebase/firestore";
import { msgAlert } from "../../../events/alerts";
//add notes
export async function addNotesFS(userId, noteId, noteTitle, noteFolder, folderColor, content, owner, dateCreated) {
    try {
        const foldersRef = collection(db, "users", userId, "folders");
        const q = query(foldersRef, where("title", "==", noteFolder));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const folderDoc = snapshot.docs[0];
            const folderId = folderDoc.id;

            const notesRef = doc(db, "users", userId, "folders", folderId, "notes", noteId);
            await setDoc(notesRef, {
                id: noteId,
                title: noteTitle,
                folder: noteFolder,
                folderColor,
                content,
                owner,
                dateCreated,
            });
            console.log("Note created")
        } else {
            msgAlert("Folder not found");
        }
    } catch (err) {
        msgAlert(err);
        throw err
    }
}

//delete note
export async function delNoteFS(userId, folderTitle, noteId) {
    try {
        const foldersRef = collection(db, "users", userId, "folders");
        const q = query(foldersRef, where("title", "==", folderTitle));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const folderDoc = snapshot.docs[0];
            const folderId = folderDoc.id;

            await deleteDoc(doc(db, "users", userId, "folders", folderId, "notes", noteId));
            console.log(`Note ${noteId} has been deleted`);
        } else {
            msgAlert("Folder not found");
        }
    } catch (err) {
        msgAlert(err);
        throw err;
    }
}
//get all notes
export async function getAllNotesFS(userId) {
    try {
        const foldersRef = collection(db, "users", userId, "folders");
        const foldersSnap = await getDocs(foldersRef);

        const allNotes = [];

        for (const folderDoc of foldersSnap.docs) {
            const notesRef = collection(folderDoc.ref, "notes");
            const notesSnap = await getDocs(notesRef);

            notesSnap.forEach((noteDoc) => {
                allNotes.push({
                    id: noteDoc.id,
                    ...noteDoc.data(),
                });
            });
        }

        return allNotes;
    } catch (err) {
        msgAlert(err);
        throw err;
    }
}