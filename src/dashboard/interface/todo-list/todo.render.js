import { msgAlert } from "../../events/alerts";
import { mainWorkspace, workspaceHeader } from "../components";

//bootstrap for todo component
export function initTodo(){
    TodoHeader()
}
function TodoHeader() {
    const createButton = document.createElement('button');
    createButton.className = 'button w-40'
    createButton.textContent = 'New ToDo Set'

    createButton.addEventListener('click', () => {
        msgAlert("I WORK");
    })
    workspaceHeader.appendChild(createButton);
}