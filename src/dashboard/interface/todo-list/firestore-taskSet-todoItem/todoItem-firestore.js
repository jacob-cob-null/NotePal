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


//read todoItems to localstorage

//load todoItems from firestore

//delete todoItems

//toggle todoItems
export async function updatetodoItem(userId, taskSetId, todoItemId, isComplete) {
    try {
        const todoItemRef = doc(db, "users", userId, "taskSets", taskSetId, "tasks", todoItemId)
        await updateDoc(todoItemRef, {
            status: isComplete
        });
        console.log(`Todo item ${todoItemId} has been updated!`)
    } catch (err) {
        msgAlert("Error creating todo item " + err);
        throw err
    }
}
