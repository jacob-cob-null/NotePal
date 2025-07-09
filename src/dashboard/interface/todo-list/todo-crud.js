export function todoObject(title) {
    const id = crypto.randomUUID();
    const todoItems = [];
    
    function addTodoItem(title, dueDate, isComplete = false) {
        const todo = {
            id: crypto.randomUUID(),
            title,
            dueDate,
            isComplete
        };
        todoItems.push(todo);
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
    
    return {
        id,
        title,
        todoItems,
        addTodoItem,
        deleteTodoItem
    };
}