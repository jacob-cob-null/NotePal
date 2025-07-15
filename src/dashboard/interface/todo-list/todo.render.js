import { msgAlert } from "../../events/alerts";
import { mainWorkspace, workspaceHeader } from "../components";
import { createTodoSet, createTodoItem } from "/src/dashboard/interface/todo-list/todo-dom";
import { createTaskSet } from "../../events/alerts";
import { todoObject } from "./todo-crud";
import { addTodoObject } from "./todo-object";
import { loadTodoObjectFromLocalStorage, saveTodoObjectLocalStorage, todoObjectList } from "./todo-object";
import { userStore } from "../../../login/user";

//gets current user
const currentUser = await userStore.getUser();

//bootstrap for todo component
export function initTodo() {
    TodoHeader();
    loadTodoObjectFromLocalStorage();
    renderTodo(mainWorkspace, todoObjectList);
}

//button to create todo set
function TodoHeader() {
    const createButton = document.createElement('button');
    createButton.className = 'button w-40';
    createButton.textContent = 'New Task Set';

    createButton.addEventListener('click', async () => {
        try {
            const title = await createTaskSet();
            if (!title || title.trim() === '') {
                msgAlert('Please enter a valid task set title');
                return;
            }

            const newTodoObj = todoObject(title);
            addTodoObject(newTodoObj);

            // Create and append the new todo set
            createTodoSet(mainWorkspace, newTodoObj);
            saveTodoObjectLocalStorage();
        } catch (error) {
            console.error('Error creating task set:', error);
            msgAlert('Failed to create task set');
        }
    });

    workspaceHeader.appendChild(createButton);
}

function renderTodo(target, todoObjArr) {
    target.innerHTML = ''; // clear previous render

    todoObjArr.forEach(taskSet => {
        const container = createTodoSet(target, taskSet);

        // Render existing todo items for this task set
        const itemContainer = container.querySelector('.todoItemContainer');
        if (itemContainer && taskSet.todoItems) {
            taskSet.todoItems.forEach(task => {
                createTodoItem(itemContainer, task, taskSet);
            });
        }
    });
}