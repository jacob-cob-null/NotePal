import { db } from "../../../../Firebase/setup";
import { setDoc, doc, deleteDoc, getDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { msgAlert } from "../../../events/alerts";
//create todoItem to firestore
export async function addTodoItemFS(userId, taskSetId, todoItemId, todoItemTitle, todoItemDueDate, isComplete) {
    try {
        const todoItemRef = doc(db, "users", userId, "taskSets", taskSetId, "tasks", todoItemId)
        await setDoc(todoItemRef, {
            id: todoItemId,
            title: todoItemTitle,
            dueDate: todoItemDueDate,
            status: isComplete,
            parentId: taskSetId
        });
        console.log(`Todo Item: ${todoItemId} has been created!`)
    }
    catch (err) {
        msgAlert("Error creating todo item " + err);
        throw err
    }
}
//delete todoItems
export async function deleteTodoItemFS(userId, taskSetId, todoItemId) {
    try {
        await deleteDoc(doc(db, "users", userId, "taskSets", taskSetId, "tasks", todoItemId))
        console.log(`Deleting: todo ${todoItemId}`);
    } catch (err) {
        msgAlert("Error deleting todo item " + err);
        throw err
    }
}

//toggle todoItems
export async function updateTodoItemFS(userId, taskSetId, todoItemId, isComplete) {
    try {
        const todoItemRef = doc(db, "users", userId, "taskSets", taskSetId, "tasks", todoItemId)
        await updateDoc(todoItemRef, {
            status: isComplete
        });
        console.log(`Todo item ${todoItemId} has been updated!`)
    } catch (err) {
        msgAlert("Error updating todo item " + err);
        throw err
    }
}
