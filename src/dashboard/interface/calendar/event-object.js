import { msgAlert } from "../../events/alerts"
import { loadCustomEvents } from "./calendar-function"
import { getCalendarInstance } from "./calendar-setup"

//event factory
export class customEvent {
    static currEvents = []

    constructor(title, startDate, endDate, id = null) {
        this.id = id ? id : "Event-" + crypto.randomUUID();
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        customEvent.currEvents.push(this);
        // Optionally: push to Firestore
    }

    getId() {
        return String(this.id);
    }

    static newEvent(title, startDate, endDate) {
        msgAlert("New Event Created");
        const ev = new customEvent(title, startDate, endDate);
        customEvent.saveAllToLocalStorage();
        return ev;
    }

    static getAllEvents() {
        return customEvent.currEvents.map(event => ({
            id: event.id,
            title: event.title,
            startDate: event.startDate,
            endDate: event.endDate
        }));
    }

    static findEvent(id) {
        return customEvent.currEvents.find(e => e.id === id) || null;
    }

    static getEventArr() {
        return this.currEvents;
    }

    static saveAllToLocalStorage() {
        const events = customEvent.getAllEvents();
        localStorage.setItem('customEvents', JSON.stringify(events));
    }

    static loadAllFromLocalStorage() {
        const data = localStorage.getItem('customEvents');
        if (!data) return;
        try {
            const arr = JSON.parse(data);
            customEvent.currEvents = [];
            arr.forEach(ev => {
                new customEvent(ev.title, ev.startDate, ev.endDate, ev.id);
            });
        } catch (e) {
            msgAlert('Failed to load custom events from local storage.');
        }
    }

    static reloadAndRenderAll() {
        customEvent.loadAllFromLocalStorage();
        loadCustomEvents();
    }

    static updateEvents(id, newTitle, newStart, newEnd) {
        const event = customEvent.findEvent(id);
        if (!event) {
            msgAlert(`Error: Event with ID "${id}" not found.`);
            return;
        }

        let validStart = new Date(newStart);
        let validEnd = new Date(newEnd);
        if (isNaN(validStart.getTime())) {
            msgAlert("Invalid start date. Keeping previous start date.");
            validStart = new Date(event.startDate);
        }
        if (isNaN(validEnd.getTime())) {
            msgAlert("Invalid end date. Keeping previous end date.");
            validEnd = new Date(event.endDate);
        }

        event.title = newTitle;
        event.startDate = validStart.toISOString().slice(0, 10);
        event.endDate = validEnd.toISOString().slice(0, 10);

        msgAlert(`Event "${newTitle}" has been updated`);
        customEvent.saveAllToLocalStorage();

        // Update calendar UI
        const calendar = getCalendarInstance && getCalendarInstance();
        if (calendar) {
            let calendarEvent = calendar.getEventById(id);
            if (calendarEvent) {
                calendarEvent.setProp('title', newTitle);
                calendarEvent.setStart(validStart);

                const endDateForCalendar = new Date(validEnd);
                if (event.startDate !== event.endDate) {
                    endDateForCalendar.setDate(endDateForCalendar.getDate() + 1);
                }
                calendarEvent.setEnd(endDateForCalendar);
            } else {
                // fallback: remove and re-add
                calendar.getEvents().forEach(ev => {
                    if (ev.id === id) ev.remove();
                });
                const endDateForCalendar = new Date(validEnd);
                if (event.startDate !== event.endDate) {
                    endDateForCalendar.setDate(endDateForCalendar.getDate() + 1);
                }
                calendar.addEvent({
                    id: event.id,
                    title: event.title,
                    start: new Date(event.startDate),
                    end: endDateForCalendar
                });
            }
        }
    }

    static deleteEvent(id) {
        const event = customEvent.findEvent(id);
        if (!event) {
            msgAlert(`Error: Event with ID "${id}" not found.`);
            return;
        }

        customEvent.currEvents = customEvent.currEvents.filter(e => e.id !== id);
        msgAlert(`"${event.title}" has been deleted`);
        customEvent.saveAllToLocalStorage();

        // Update calendar UI
        const calendar = getCalendarInstance();
        const calendarEvent = calendar.getEventById(id);
        if (calendarEvent) calendarEvent.remove();
    }
}
