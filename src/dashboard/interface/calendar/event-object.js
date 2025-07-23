import { msgAlert } from "../../events/alerts"

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
        return customEvent.currEvents
    }
    static updateEvents(id, title, startDate, endDate) {
        const event = customEvent.currEvents.find(e => e.id === id)
        event.title = title
        event.startDate = startDate
        event.endDate = endDate
        //edit firestore
    }
    static deleteEvent(id) {
        const event = customEvent.currEvents.find(e => e.id === id) //find event
        customEvent.currEvents = customEvent.currEvents.filter(e => e.id !== id)
        //delete to firestore
    }

}
