import { todoObject } from './todo-crud';

export const todoObjectList = [];

// Add a task set
export function addTodoObject(obj) {
    todoObjectList.push(obj);
}

export function deleteObject(id) {
    const index = todoObjectList.findIndex(obj => obj.id === id);
    if (index !== -1) {
        todoObjectList.splice(index, 1);
        return true;
    }
    return false;
}
//retrieve all tasks
export function getAllTodoObjects() {
    return todoObjectList;
}

// Save to local storage
export function saveTodoObjectLocalStorage() {
    try {
        localStorage.setItem('todoObjectList', JSON.stringify(todoObjectList));
        console.log('Todo objects saved to localStorage');
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

// Load from localStorage
export function loadTodoObjectFromLocalStorage() {
    try {
        //get todo object list array
        const saved = JSON.parse(localStorage.getItem('todoObjectList')) || [];
        todoObjectList.length = 0; // Clear the existing list before populating

        saved.forEach(savedObj => {
            // FIX: Pass both id and title in the correct order to todoObject
            const reconstructed = todoObject(savedObj.id, savedObj.title); // <--- CORRECTED LINE

            // The reconstructed.id = savedObj.id; line is now redundant but harmless if left.
            // You can remove it since todoObject will set the id directly.

            //Reconstruct todo items array with correct parentId and IDs
            if (Array.isArray(savedObj.todoItems)) {
                // When you push tasks to reconstructed.todoItems, you're effectively
                // bypassing the addTodoItem method of the reconstructed object.
                // This is generally fine for loading, as you're just restoring state.
                reconstructed.todoItems = savedObj.todoItems.map(task => ({
                    id: task.id,
                    title: task.title,
                    dueDate: task.dueDate,
                    isComplete: task.isComplete,
                    parentId: savedObj.id // Ensure parentId is correct
                }));
            }
            todoObjectList.push(reconstructed);
        });
        console.log('Todo objects loaded from localStorage');
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
    }
}