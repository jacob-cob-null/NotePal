import { createEventModal, deleteEventModal } from "../../events/alerts"
import { customEvent } from "./event-object"

//add event button
export function calendarModal() {
    const modal = document.createElement('details')
    modal.className = 'dropdown relative'
    modal.innerHTML = `<summary class="button">Actions</summary>
        <ul class="menu absolute dropdown-content flex flex-col justify-center gap-1 bg-white rounded-lg z-100 w-35 p-2 shadow-lg">
            <li id="newEvent" class="w-full bg-white hover:brightness-95 active:brightness-90 transition-all duration-200 rounded-md">New Event</li>
            <li id="editEvent" class="w-full bg-white hover:brightness-95 active:brightness-90 transition-all duration-200 rounded-md">Edit Event</li>
            <li id="delEvent" class="w-full bg-white hover:brightness-95 active:brightness-90 transition-all duration-200 rounded-md">Delete Event</li>
        </ul>`
    return modal
}
//init calendar event actions
export function initActions() {
    const newBtn = document.getElementById('newEvent')
    newBtn.addEventListener('click', newEvent)

    const delBtn = document.getElementById('delEvent')
    delBtn.addEventListener('click', delEvent)
}

//add
async function newEvent() {
    //retrive attribute
    const { title: event, startDate: startDate, endDate: endDate } = await createEventModal()

    //call event class
    customEvent.newEvent(event, startDate, endDate)
}
async function delEvent() {
    const { id, title } = await deleteEventModal(customEvent.getAllEvents())
    if (!id) return; // cancel or no selection
    customEvent.deleteEvent(id)
}
//delete

//edit