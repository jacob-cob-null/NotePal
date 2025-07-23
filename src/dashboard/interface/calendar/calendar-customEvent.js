//add event button
export function calendarModal() {
    const modal = document.createElement('details')
    modal.className = 'dropdown relative'
    modal.innerHTML = `<summary class="button">Actions</summary>
        <ul class="menu absolute dropdown-content flex flex-col justify-center gap-1 bg-white rounded-lg z-100 w-35 p-1 shadow-lg">
            <li id="newEvent" class="w-full bg-white hover:brightness-95 active:brightness-90 transition-all duration-200 rounded-md">New Event</li>
            <li id="editEvent" class="w-full bg-white hover:brightness-95 active:brightness-90 transition-all duration-200 rounded-md">Edit Event</li>
            <li id="delEvent" class="w-full bg-white hover:brightness-95 active:brightness-90 transition-all duration-200 rounded-md">Delete Event</li>
        </ul>`
    return modal
}

//sweetalert for event title, start date, end date