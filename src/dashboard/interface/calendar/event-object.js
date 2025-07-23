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
    static updateEvents(id, title, startDate, endDate) {
        const event = customEvent.currEvents.find(e => e.id === id)
        event.title = title
        event.startDate = startDate
        event.endDate = endDate
        //edit firestore
        loadCustomEvents() //update visual to calendar
    }
    static deleteEvent(id) {
        const event = customEvent.currEvents.find(e => e.id === id);
        if (!event) {
            msgAlert(`Error: Event with ID "${id}" not found.`);
            return;
        }
        const calendar = getCalendarInstance();
        const calendarEvent = calendar.getEventById(id);
        if (calendarEvent) calendarEvent.remove();

        customEvent.currEvents = customEvent.currEvents.filter(e => e.id !== id);
        msgAlert(`"${event.title}" has been deleted`);

    }


}
