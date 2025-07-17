
import { getTaskSetFS } from './firestore-taskSet-todoItem/taskSet-firestore';
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
export async function loadTodoObjectFromLocalStorage(userId = null) {
    const LOCAL_KEY = 'todoObjectList';
    const LAST_FETCHED_KEY = 'todoLastFetched';
    const STALE_TIME = 10 * 60 * 1000; // 10 minutes

    let sourceData = [];

    try {
        const cachedData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
        const lastFetched = Number(localStorage.getItem(LAST_FETCHED_KEY));
        const now = Date.now();
        const isStale = !lastFetched || now - lastFetched > STALE_TIME;

        if (userId && (cachedData.length === 0 || isStale)) {
            // Fetch from Firestore only if cache is empty or stale
            sourceData = await getTaskSetFS(userId);
            console.log("Loaded from Firestore");

            // Save to localStorage
            localStorage.setItem(LOCAL_KEY, JSON.stringify(sourceData));
            localStorage.setItem(LAST_FETCHED_KEY, String(now));
        } else {
            console.log("Loaded from localStorage");
            sourceData = cachedData;
        }

        // Clear and reconstruct todoObjectList
        todoObjectList.length = 0;

        sourceData.forEach(savedObj => {
            const reconstructed = todoObject(savedObj.id, savedObj.title);

            if (Array.isArray(savedObj.todoItems)) {
                reconstructed.todoItems.length = 0;
                reconstructed.todoItems.push(...savedObj.todoItems.map(task => ({
                    id: task.id,
                    title: task.title,
                    dueDate: task.dueDate,
                    isComplete: task.isComplete,
                    parentId: savedObj.id
                })));
            }

            todoObjectList.push(reconstructed);
        });

        console.log('Todo objects loaded successfully');
    } catch (error) {
        console.error('Failed to load todo objects:', error);
    }
}
