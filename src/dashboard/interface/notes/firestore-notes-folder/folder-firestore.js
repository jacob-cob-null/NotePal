import { db } from "../../../../Firebase/setup";
import { setDoc, doc, query, deleteDoc, updateDoc, collection, where, getDocs } from "firebase/firestore";
import { msgAlert } from "../../../events/alerts";
import { getCurrentDate } from "../../../events/util";

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
            dateCreated: getCurrentDate(),
            folder: "Default Folder",
            folderColor: "red",
            owner: userId
        });
        console.log("Default note created")
    } catch (err) {
        msgAlert(err);
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
        msgAlert(err);
    }
}
//delete folder
export async function delFolderFS(userId, folderName) {
    try {
        const folderRef = collection(db, "users", userId, "folders");
        const q = query(folderRef, where("title", "==", folderName));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const folderDoc = snapshot.docs[0];
            await deleteDoc(folderDoc.ref);
            console.log(`Folder "${folderName}" has been deleted`);
        } else {
            console.log(`No folder found with title "${folderName}"`);
        }
    } catch (err) {
        msgAlert(err);
    }
}
//update folder

export async function updateFolderFS(userId, folderTitle, newTitle, newColor) {
    try {
        const folderRef = collection(db, "users", userId, "folders");
        const q = query(folderRef, where("title", "==", folderTitle));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const folderDoc = snapshot.docs[0];
            await updateDoc(folderDoc.ref, {
                title: newTitle,
                color: newColor
            });
            console.log(`Folder "${folderTitle}" has been updated`);
        } else {
            console.log(`No folder found with title "${folderTitle}"`);
        }
    } catch (err) {
        msgAlert(err);
    }
}
//return all folders
export async function getAllFoldersFS(userId) {
    let foldersCollection = [];
    try {
        const foldersRef = collection(db, "users", userId, "folders");
        const snapshot = await getDocs(foldersRef);

        snapshot.forEach((folder) => {
            const folderData = folder.data();
            foldersCollection.push({
                color: folderData.color,
                id: folder.id,
                title: folderData.title
            });
        });

        console.log("Returned all folders");
        return foldersCollection;
    } catch (err) {
        msgAlert(err);
        return []; // Always return a fallback array
    }
}