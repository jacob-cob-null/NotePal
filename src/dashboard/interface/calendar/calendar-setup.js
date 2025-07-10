import { Calendar } from "fullcalendar/index.js";
import { createCalendar } from "./calendar-render";

export function initCalendar(target) {
    // Create wrapper for layout containment
    const wrapper = document.createElement("div");
    wrapper.id = "calendarWrapper";
    wrapper.className = "w-full h-full flex justify-center items-center";

    // Create actual calendar container
    const calendarDiv = createCalendar();
    calendarDiv.id = "calendar";
    calendarDiv.className =
        "w-full h-[600px] bg-white rounded-xl font-head overflow-hidden p-4 shadow-lg";

    // Inject into workspace
    wrapper.appendChild(calendarDiv);
    target.innerHTML = ""; // clear previous content
    target.appendChild(wrapper);

    // Init FullCalendar
    const calendar = new Calendar(calendarDiv, {
        initialView: "dayGridMonth",
        height: "100%", // Let it use the full container height
    });

    calendar.render();

    // Update layout on resize (e.g. sidebar toggle)
    new ResizeObserver(() => calendar.updateSize()).observe(wrapper);
}
