import { deleteConfirm, createTodoItemModal } from "../../events/alerts";
import { saveTodoObjectLocalStorage, deleteObject } from "./todo-object";

export function createTodoSet(target, todoObj) {
    const { id, title, addTodoItem } = todoObj;
    
    //container
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todoContainer');
    
    const todoHeader = document.createElement('section');
    todoHeader.classList.add('todoHeader');
    
    //header and close
    const todoText = document.createElement('h1');
    todoText.classList.add('todoText');
    todoText.textContent = title;
    
    const todoClose = document.createElement('i'); //delete todoContainer with preconfirm
    todoClose.className = 'bx bx-minus todoClose dark-hover-active';
    
    todoClose.addEventListener('click', async () => {
        function deleteTodoContainer() {
            //remove to dom
            todoContainer.remove();
            //remove to todoObject
            deleteObject(id);
            //remove firestore
            saveTodoObjectLocalStorage();
        }
        await deleteConfirm(deleteTodoContainer, 'Task Set');
    });
    
    todoHeader.appendChild(todoText);
    todoHeader.appendChild(todoClose);
    
    //where todo items will be inserted
    const todoItemContainer = document.createElement('div');
    todoItemContainer.classList.add('todoItemContainer');
    
    //adds new todo items
    const todoButton = document.createElement('button');
    todoButton.className = 'todoButton dark-hover-active';
    const plus = document.createElement('i');
    plus.className = 'bx bx-plus text-xl';
    todoButton.appendChild(plus);
    todoButton.textContent = 'New Task';
    
    //adds id
    todoContainer.dataset.id = id;
    
    todoButton.addEventListener('click', async () => {
        try {
            const { task, dueDate } = await createTodoItemModal();
            
            if (!task || task.trim() === '') {
                return;
            }
            
            const taskObject = addTodoItem(task, dueDate);
            createTodoItem(todoItemContainer, taskObject, todoObj);
            saveTodoObjectLocalStorage();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    });
    
    todoContainer.appendChild(todoHeader);
    todoContainer.appendChild(todoItemContainer);
    todoContainer.appendChild(todoButton);
    
    target.appendChild(todoContainer);
    
    //return the full container so items can be rendered
    return todoContainer;
}

export function createTodoItem(target, task, todoObj) {
    const { id: taskId, title: taskTitle, dueDate } = task;
    const { deleteTodoItem } = todoObj;
    
    const todoItem = document.createElement('section');
    todoItem.classList.add('todoItem');
    todoItem.dataset.id = taskId;
    
    const todoItemSection = document.createElement('section');
    todoItemSection.classList.add('todoItemSection');
    
    const todoItemText = document.createElement('h1');
    todoItemText.classList.add('todoItemText');
    todoItemText.textContent = taskTitle;
    
    const todoDate = document.createElement('h1');
    todoDate.classList.add('todoDate');
    todoDate.textContent = dueDate;
    
    const todoDelete = document.createElement('i');
    todoDelete.className = 'bx bx-trash todoDelete';
    todoDelete.addEventListener('click', () => {
        todoItem.remove();               // ✅ remove from DOM
        deleteTodoItem(taskId);         // ✅ remove from memory
        // TODO: delete from Firestore
        saveTodoObjectLocalStorage();
    });
    
    todoItemSection.append(todoItemText, todoDate);
    todoItem.append(todoItemSection, todoDelete);
    target.appendChild(todoItem);
}