import { db } from "../../../../Firebase/setup";
import { setDoc, doc, deleteDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { msgAlert } from "../../../events/alerts";

//initialize task set collection and todo items subcollection
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
        throw err;
    }
}

//add task set
export async function addTaskSetFS(taskSetId, userId, title,) {
    try {
        const taskSetRef = doc(db, "users", userId, "taskSets", taskSetId);
        await setDoc(taskSetRef, {
            id: taskSetId,
            title: title
        });

        // Create default todo item in tasks subcollection
        const todoId = "TodoItem" + crypto.randomUUID();
        const taskRef = doc(db, "users", userId, "taskSets", taskSetId, "tasks", todoId);

        await setDoc(taskRef, {
            id: todoId,
            title: "Welcome Task",
            completed: false,
            dueDate: null,
            parentId: taskSetId
        });

    } catch (err) {
        msgAlert("Error creating task set " + err);
        throw err
    }
}
//read taskset to localstorage
export async function getTaskSetFS(userId) {
    try {
        const query = collection(db, "users", userId, "taskSets")
        const docSnap = await getDocs(query);
        if (docSnap.empty) {
            console.log("Query Failed")
            return
        }
        const taskSetsFS = []
        docSnap.forEach((taskSets) => {
            const data = taskSets.data();
            taskSetsFS.push({
                id: taskSets.id,
                title: data.title
            });
        })
        return taskSetsFS
    }
    catch (err) {
        msgAlert("Error retrieving task set " + err);
        throw err
    }
}

//delete taskset
export async function delTaskSetFS(userId, taskSetId) {
    try {
        await deleteDoc(doc(db, "users", userId, "taskSets", taskSetId))
    } catch (err) {
        msgAlert("Error creating task set " + err);
        throw err
    }
}

