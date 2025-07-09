import { msgAlert } from "../../events/alerts";
import { mainWorkspace, workspaceHeader } from "../components";
import { createTodoSet } from "/src/dashboard/interface/todo-list/todo-dom"
import { createTaskSet } from "../../events/alerts";
import { todoObject } from "./todo-crud";
import { addTodoObject } from "./todo-object";

//bootstrap for todo component
export function initTodo() {
    TodoHeader()
}
//button to create todo set
function TodoHeader() {
    const createButton = document.createElement('button');
    createButton.className = 'button w-40'
    createButton.textContent = 'New Task Set'

    createButton.addEventListener('click', async () => {
        const title = await createTaskSet()
        const newTodoObj = todoObject(title); //creates obj
        addTodoObject(newTodoObj) //push to array
        
        createTodoSet(mainWorkspace, newTodoObj) //appends to main workspace
    })
    workspaceHeader.appendChild(createButton);
}