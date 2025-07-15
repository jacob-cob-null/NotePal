import { db } from "../../../../Firebase/setup";
import { setDoc, doc } from "firebase/firestore";
import { msgAlert } from "../../../events/alerts";

//create taskset from userId
export async function initTaskSetCollection(userId) {
    try {
        // Create default task set (parent document)
        const taskSetId = "TaskSet" + crypto.randomUUID();
        const taskSetRef = doc(db, "users", userId, "taskSets", taskSetId);
        await setDoc(taskSetRef, {
            id: taskSetId,
            title: "Default Task Set"
        });
        console.log("Default task set created");

        // Create default todo item in tasks subcollection
        const todoId = "TodoItem" + crypto.randomUUID();
        const taskRef = doc(db, "users", userId, "taskSets", taskSetId, "tasks", todoId);

        await setDoc(taskRef, {
            id: todoId,
            title: "Welcome Task",
            description: "This is your first task",
            completed: false,
            dueDate: null
        });
        console.log("Default task created");

    } catch (err) {
        console.error("Task initialization failed:", err);
        msgAlert("Error creating default tasks", "error");
        throw err; // Re-throw so calling function knows it failed
    }
}

//read taskset to localstorage

//load taskset from firestore

//delete taskset

