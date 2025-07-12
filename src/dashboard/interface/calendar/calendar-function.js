import { getCalendarInstance } from "./calendar-setup.js";

export function loadEventsFromTodos(allTodoObjects = []) {
    const calendar = getCalendarInstance();
    if (!calendar) return;

    // Clear existing events to prevent duplicates
    calendar.getEvents().forEach(event => event.remove());

    // Add events from all todo folders
    allTodoObjects.forEach(todoObj => {

        const taskSet = todoObj.title
        todoObj.todoItems.forEach(todo => {
            calendar.addEvent({
                id: todo.id,
                title: todo.title,
                description: `${todo.title} | ${taskSet}`,
                start: todo.dueDate,
                color: todo.isComplete ? '#9ca3af' : ''
            });
        });
    });
}