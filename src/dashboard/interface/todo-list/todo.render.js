import { msgAlert } from "../../events/alerts";
import { mainWorkspace, workspaceHeader } from "../components";
import { createTodoSet, createTodoItem } from "/src/dashboard/interface/todo-list/todo-dom";
import { createTaskSet } from "../../events/alerts";
import { todoObject } from "./todo-crud";
import { addTodoObject } from "./todo-object";
import { loadTodoObjectFromLocalStorage, saveTodoObjectLocalStorage, todoObjectList } from "./todo-object";
import { userStore } from "../../../login/user";
import { addTaskSetFS } from "./firestore-taskSet-todoItem/taskSet-firestore";

//gets current user


//bootstrap for todo component
export function initTodo() {
    const user = userStore.getUser();
    if (!user || !user.uid) {
        console.warn("No user available for todo initialization");
        return;
    }

    TodoHeader(user);
    loadTodoObjectFromLocalStorage();
    renderTodo(mainWorkspace, todoObjectList, user); // ✅ Pass user
}
//button to create todo set
function TodoHeader(user) {
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
            mainWorkspace.innerHTML = ''
            const taskSetId = "TaskSet" + crypto.randomUUID();
            const newTodoObj = todoObject(taskSetId, title); //creates obj
            addTodoObject(newTodoObj); //pushes obj
            addTaskSetFS(taskSetId, user.uid, title)

            // Create and append the new todo set
            createTodoSet(mainWorkspace, newTodoObj, user);
            saveTodoObjectLocalStorage();
        } catch (error) {
            console.error('Error creating task set:', error);
            msgAlert('Failed to create task set');
        }
    });

    workspaceHeader.appendChild(createButton);
}
export function renderTodo(target, todoObjArr, user) {
    target.innerHTML = '';

    if (todoObjArr.length > 0) {
        todoObjArr.forEach(taskSet => {
            const container = createTodoSet(target, taskSet, user);
            const itemContainer = container.querySelector('.todoItemContainer');
            if (itemContainer && taskSet.todoItems) {
                taskSet.todoItems.forEach(task => {
                    createTodoItem(itemContainer, task, taskSet);
                });
            }
        });
    } else {
        const empty = document.createElement('h1');
        empty.textContent = 'No pending tasks! Time to relax';
        empty.classList.add('header', 'text-center')
        target.appendChild(empty);
    }
}