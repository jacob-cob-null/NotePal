//todo factory
export function createToDoObject(id, title, todoItem) {
    return (id, title, todoItem)
}
// todoItem factory
function createTodoItem(taskName, dueDate, title) {
    return {taskName, dueDate, title}
}