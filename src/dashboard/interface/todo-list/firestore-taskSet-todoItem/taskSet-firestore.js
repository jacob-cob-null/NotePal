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
//read taskset and todoitems to localstorage
export async function getTaskSetFS(userId) {
    try {
        const taskSetsQuery = collection(db, "users", userId, "taskSets");
        const taskSetsSnapshot = await getDocs(taskSetsQuery);

        if (taskSetsSnapshot.empty) {
            console.log("No task sets found");
            return [];
        }

        const taskSetsFS = [];

        // Process each task set
        for (const taskSetDoc of taskSetsSnapshot.docs) {
            const taskSetData = taskSetDoc.data();

            // Get todo items for this task set
            const todoItemsQuery = collection(db, "users", userId, "taskSets", taskSetDoc.id, "tasks");
            const todoItemsSnapshot = await getDocs(todoItemsQuery);

            const todoItems = [];
            todoItemsSnapshot.forEach((todoDoc) => {
                const todoData = todoDoc.data();
                todoItems.push({
                    id: todoData.id,
                    title: todoData.title,
                    dueDate: todoData.dueDate,
                    isComplete: todoData.status,
                    parentId: todoData.parentId
                });
            });

            taskSetsFS.push({
                id: taskSetDoc.id,
                title: taskSetData.title,
                todoItems: todoItems
            });
        }

        console.log("Task sets with todo items loaded:", taskSetsFS);
        return taskSetsFS;
    }
    catch (err) {
        msgAlert("Error retrieving task sets " + err);
        throw err;
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

