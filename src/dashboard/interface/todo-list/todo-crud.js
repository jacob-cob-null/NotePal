//todo factory
export function createToDoObject(id, title, todoItem) {
    return (id, title, todoItem)
}
// todoItem factory
function createTodoItem(title, dueDate, isComplete) {
    return {title, dueDate, isComplete}
}