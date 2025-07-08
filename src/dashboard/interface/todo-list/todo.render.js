import { msgAlert } from "../../events/alerts";
import { mainWorkspace, workspaceHeader } from "../components";
import {createTodoSet} from "/src/dashboard/interface/todo-list/todo-dom"

//bootstrap for todo component
export function initTodo(){
    TodoHeader()
}
//button to create todo set
function TodoHeader() {
    const createButton = document.createElement('button');
    createButton.className = 'button w-40'
    createButton.textContent = 'New Task Set'

    createButton.addEventListener('click', () => {
        createTodoSet(mainWorkspace, "Sample")
    })
    workspaceHeader.appendChild(createButton);
}