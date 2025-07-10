import { Calendar } from "fullcalendar/index.js";
import { createCalendar } from "./calendar-render";

//init calendar
export function initCalendar(target) {
    //create div
    const calendarDiv = createCalendar();

    calendarDiv.className = "w-full h-full bg-white p-3 sm:p8 rounded-xl font-head"
    //append to target
    target.appendChild(calendarDiv)

    const calendar = new Calendar(calendarDiv, {
        initialView: "dayGridMonth",
    });
    calendar.render();


}

