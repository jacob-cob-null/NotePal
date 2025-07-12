import { Calendar } from "fullcalendar/index.js";
import { createCalendar } from "./calendar-render";

let calendarInstance = null;

export function initCalendar(target) {

    const wrapper = document.createElement("div");
    wrapper.id = "calendarWrapper";
    wrapper.className = "w-full h-full flex justify-center items-center";

    const calendarDiv = document.createElement("div");
    calendarDiv.id = "calendar";
    calendarDiv.className = "w-full h-[600px] bg-white rounded-xl font-head overflow-hidden p-4 shadow-lg";

    const calendar = new Calendar(calendarDiv, {
        initialView: "dayGridMonth",
        height: "100%",
    });

    calendar.render();
    new ResizeObserver(() => calendar.updateSize()).observe(wrapper);

    calendarInstance = calendar;
    console.log("🔥 Initializing calendar");

    wrapper.appendChild(calendarDiv);
    target.appendChild(wrapper);

}

export function getCalendarInstance() {
    return calendarInstance;
}