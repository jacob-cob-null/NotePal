import { msgAlert } from "../../events/alerts"
import { loadCustomEvents } from "./calendar-function"
import { getCalendarInstance } from "./calendar-setup"

//event factory
export class customEvent {
    static currEvents = []
    constructor(title, startDate, endDate) {

        this.id = "Event-" + crypto.randomUUID()
        this.title = title,
            this.startDate = startDate,
            this.endDate = endDate

        customEvent.currEvents.push(this)
        //add to firestore
    }
    getId() {
        return String(this.id)
    }
    static newEvent(title, startDate, endDate) {
        msgAlert("New Event Created")
        return new customEvent(title, startDate, endDate)
        //add to firestore
    }
    static getAllEvents() {
        return customEvent.currEvents.map(event => ({
            id: event.id,
            title: event.title,
            startDate: event.startDate,
            endDate: event.endDate
        }));
    }
    static updateEvents(id, newTitle, newStart, newEnd) {
        const event = customEvent.findEvent(id)
        if (event === null) {
            msgAlert(`Error: Event with ID "${id}" not found.`);
            return;
        }

        event.title = newTitle
        event.startDate = newStart
        event.endDate = newEnd
        msgAlert(`Event ${newTitle} has been updated`);
        //edit firestore

        loadCustomEvents() //update visual to calendar
    }
    static deleteEvent(id) {
        const event = customEvent.findEvent(id)
        if (event === null) {
            msgAlert(`Error: Event with ID "${id}" not found.`);
            return;
        }
        customEvent.currEvents = customEvent.currEvents.filter(e => e.id !== id);
        msgAlert(`"${event.title}" has been deleted`);

        //firestore

        //dynamically update calendar
        const calendar = getCalendarInstance();
        const calendarEvent = calendar.getEventById(id);
        if (calendarEvent) calendarEvent.remove();
    }
    static findEvent(id) {
        const event = customEvent.currEvents.find(e => e.id === id);
        //event with id does not exist
        if (!event) {
            return null;
        }
        return event
    }
}
