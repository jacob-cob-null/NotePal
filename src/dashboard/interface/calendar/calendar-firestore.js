import { db } from "../../../Firebase/setup";
import { setDoc, doc, query, deleteDoc, updateDoc, collection, where, getDocs } from "firebase/firestore";
import { msgAlert } from "../../events/alerts";
import { customEvent } from "./event-object";

export async function initEventsFromFirestore(userId) {
    try {
        // Clear existing events
        localStorage.removeItem("customEvents");
        customEvent.currEvents = [];

        const eventsRef = collection(db, "users", userId, "events");
        const querySnapshot = await getDocs(eventsRef);

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const { id, title, startDate, endDate } = data;

            // Use fromData instead of constructor to avoid duplicate push
            customEvent.fromData(id, title, startDate, endDate);
        });

        customEvent.saveAllToLocalStorage();
        console.log("Events loaded from Firestore.");
    } catch (err) {
        console.log("Error loading events: " + err.message);
    }
}
//create event
export async function createEventFS(userId, id, title, start, end) {
    try {
        // dates to ISO
        const startDate = typeof start === "string" ? start : new Date(start).toISOString().slice(0, 10);
        const endDate = typeof end === "string" ? end : new Date(end).toISOString().slice(0, 10);

        const eventRef = doc(collection(doc(db, "users", userId), "events"), id);

        await setDoc(eventRef, {
            id,
            title,
            startDate,
            endDate
        });

        console.log(`Event "${title}" successfully created in Firestore.`);
    } catch (err) {
        console.log("Error creating Firestore event: " + err.message);
    }
}
//delete event
export async function deleteEventFS(userId, id) {
    try {
        const eventRef = doc(db, "users", userId, "events", id);
        await deleteDoc(eventRef);
        console.log(`Event deleted from Firestore.`);
    } catch (err) {
        console.log("Error deleting Firestore event: " + err.message);
    }
}
//edit event
export async function editEventFS(userId, id, title, start, end) {
    try {
        const startDate = typeof start === "string" ? start : new Date(start).toISOString().slice(0, 10);
        const endDate = typeof end === "string" ? end : new Date(end).toISOString().slice(0, 10);

        const eventRef = doc(db, "users", userId, "events", id);
        await updateDoc(eventRef, { title, startDate, endDate });

        console.log(`Event "${title}" successfully updated in Firestore.`);
    } catch (err) {
        console.log("Error editing Firestore event: " + err.message);
    }
}