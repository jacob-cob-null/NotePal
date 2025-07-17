import { userStore } from "../../../login/user";
import { addTodoItemFS } from "./firestore-taskSet-todoItem/todoItem-firestore";
import { saveTodoObjectLocalStorage } from "./todo-object";

//init user
const user = userStore.getUser();

export function todoObject(id, title) {
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

    function deleteTodoItem(id) {
        const index = todoItems.findIndex(item => item.id === id);
        if (index !== -1) {
            const deleted = todoItems.splice(index, 1)[0];
            return deleted;
        }
        return null;
    }

    function updateTodoItem(taskId) {
        const task = todoItems.find(item => item.id === taskId);
        if (task) {
            task.isComplete = !task.isComplete;
            updateTodoItem(user.uid, id, taskId, task.isComplete)
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