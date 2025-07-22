import { getCurrentDate } from "../../events/util.js";
import { getCalendarInstance } from "./calendar-setup.js";

export function loadEventsFromTodos(allTodoObjects = []) {
    const calendar = getCalendarInstance();
    if (!calendar) return;

    const currentDate = getCurrentDate();
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
                color: getTodoColor(todo, currentDate)
            });
        });
    });
}
function getTodoColor(todo, currentDateStr) {
    const current = new Date(currentDateStr);
    const due = new Date(todo.dueDate);

    if (todo.isComplete) return '#9ca3af';         // Gray
    if (due < current) return '#f87171';           // Red
    return '#3b82f6';                              // Blue
}