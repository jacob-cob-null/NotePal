import { userStore } from "../../../login/user";
import { addTodoItemFS, deleteTodoItemFS, updateTodoItemFS } from "./firestore-taskSet-todoItem/todoItem-firestore";
import { saveTodoObjectLocalStorage } from "./todo-object";

//init user
const user = userStore.getUser();

export function todoObject(id, title) {
    const user = userStore.getUser();
    const todoItems = [];

    function addTodoItem(todoTitle, dueDate, isComplete = false) {
        const todoId = "TodoItem" + crypto.randomUUID();
        const todo = {
            id: todoId,
            title: todoTitle,
            dueDate,
            isComplete,
            parentId: id
        };
        todoItems.push(todo);
        addTodoItemFS(user.uid, id, todoId, todoTitle, dueDate, isComplete)
        return todo;
    }

    function deleteTodoItem(taskId) {
        const user = userStore.getUser();
        const index = todoItems.findIndex(item => item.id === taskId);
        if (index !== -1) {
            const deleted = todoItems.splice(index, 1)[0]; //delete locally
            deleteTodoItemFS(user.uid, id, taskId); //save firestore
            return deleted;
        }
        return null;
    }
    function updateTodoItem(taskId) {
        const user = userStore.getUser();
        const task = todoItems.find(item => item.id === taskId);
        if (task) {
            task.isComplete = !task.isComplete;
            updateTodoItemFS(user.uid, id, taskId, task.isComplete) //update firestore
            saveTodoObjectLocalStorage(); //save locally
            return task;
        }
        return null;
    }
    return {
        id,
        title,
        todoItems,
        addTodoItem,
        deleteTodoItem,
        updateTodoItem
    };
}