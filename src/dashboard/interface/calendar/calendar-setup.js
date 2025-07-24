import { Calendar } from "fullcalendar/index.js";
import { createCalendar } from "./calendar-render";
import Tooltip from 'tooltip.js';
import { createPopper } from '@popperjs/core';
import { calendarModal } from "./calendar-customEvent";

let calendarInstance = null;

export function initCalendar(target, header) {

    const wrapper = document.createElement("div");
    wrapper.id = "calendarWrapper";
    wrapper.className = "w-full h-full flex justify-center items-center";

    const calendarDiv = document.createElement("div");
    calendarDiv.id = "calendar";
    calendarDiv.className = "w-full h-[600px] bg-white rounded-xl font-head overflow-hidden p-4 shadow-lg";

    const calendar = new Calendar(calendarDiv, {
        initialView: "dayGridMonth",
        height: "100%",
        eventDidMount: function (info) {
            var tooltip = new Tooltip(info.el, {
                title: info.event.extendedProps.description,
                placement: 'top',
                trigger: 'hover',
                container: 'body'
            });
        },
    });

    calendar.render();
    new ResizeObserver(() => calendar.updateSize()).observe(wrapper);

    calendarInstance = calendar;
    console.log("🔥 Initializing calendar");

    // action modal
    const modal = calendarModal()
    wrapper.appendChild(calendarDiv);
    target.appendChild(wrapper);
    header.append(modal)

}

export function getCalendarInstance() {
    return calendarInstance;
}