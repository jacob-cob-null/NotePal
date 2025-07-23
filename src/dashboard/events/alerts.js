import Swal from 'sweetalert2'
import { checkDuplicate } from '../interface/notes/folder-crud';

export function successfulLogin(name) {
    Swal.fire({
        title: "Login Successful",
        text: `Welcome to NotePal! ${name}`,
        icon: "success"
    });
}
export function failedLogin(err) {
    Swal.fire({
        title: 'Oops! Login Failed!',
        html: `
          <p>Double-check your email and password.</p><br>
          <p>${err}</p>
        `,
        icon: 'error'
    });
}
export function successfulRegistration(name) {
    Swal.fire({
        title: `Registration Successful`,
        text: `Welcome to NotePal! ${name}`,
        icon: "success"
    });
}
// reusable template for message popups
export function msgAlert(msg) {
    Swal.fire({
        title: msg,
        position: 'top',
        timer: 800,
        showConfirmButton: false,
    })
}
//new folder modal
export async function newFolderModal() {
    const { isConfirmed, value } = await Swal.fire({
        html: `
  <input id="folderName" class="swal2-input" placeholder="Enter folder name">
  <div id="color-options" class="flex justify-center gap-4 mt-4">
    ${[
                { color: "bg-red-400", display: "oklch(70.4% 0.191 22.216)" },
                { color: "bg-orange-300", display: "oklch(93.7% 0.128 66.29)" },
                { color: "bg-green-400", display: "oklch(79.2% 0.209 151.711)" },
                { color: "bg-sky-400", display: "oklch(74.6% 0.16 232.661)" }
            ]
                .map((c, i) => `
        <label class="cursor-pointer" for="color-${i}">
          <input type="radio" name="color" id="color-${i}" value="${c.color}" class="hidden peer">
          <div class="w-10 h-10 rounded-full border-2 border-gray-300 peer-checked:border-4 peer-checked:border-black" style="background-color: ${c.display};"></div>
        </label>
      `).join('')}
  </div>
`,
        didOpen: () => {
            const labels = Swal.getPopup().querySelectorAll('label');
            labels.forEach(label => {
                label.addEventListener('click', () => {
                    labels.forEach(l => {
                        const divElement = l.querySelector('div');
                        if (divElement) { // Add null check here
                            divElement.classList.remove('selected-color');
                        }
                    });
                    const clickedDivElement = label.querySelector('div');
                    if (clickedDivElement) { // Add null check here
                        clickedDivElement.classList.add('selected-color');
                    }
                });
            });
        },
        focusConfirm: false,
        title: "Create Folder",
        showCancelButton: true,
        preConfirm: () => {
            const folderName = document.getElementById('folderName').value.trim();
            const selectedColor = document.querySelector('input[name="color"]:checked');

            if (checkDuplicate(folderName)) {
                msgAlert("Folder already exists");
                return false;
            }
            if (!folderName || !selectedColor) {
                Swal.showValidationMessage('Please enter a folder name and select a color');
                return false;
            }

            return {
                folderName: folderName,
                color: selectedColor.value
            };
        }
    });

    if (isConfirmed && value) {
        console.log("User input:", value);
        return value;
    }

    return null;
}
//delete folder modal
export async function deleteFolderModal(tempArr) {
    const { value: folderDel } = await Swal.fire({
        title: "Delete Folder",
        input: "select",
        inputOptions: tempArr,
        inputPlaceholder: "Select Folder",
        showCancelButton: true,
    });

    return folderDel;
}

//Edit folder 
export async function editFolderModal(tempArr, folderList) {
    const { value: selectedFolder } = await Swal.fire({
        title: 'Select Folder to Edit',
        input: 'select',
        inputOptions: tempArr,
        inputPlaceholder: 'Select folder',
        showCancelButton: true
    });

    if (!selectedFolder) return null;

    const oldData = folderList.find(f => f.folderName === selectedFolder);

    const colorOptions = [
        { value: "bg-red-400", display: "oklch(70.4% 0.191 22.216)" },
        { value: "bg-orange-300", display: "oklch(93.7% 0.128 66.29)" },
        { value: "bg-green-400", display: "oklch(79.2% 0.209 151.711)" },
        { value: "bg-sky-400", display: "oklch(74.6% 0.16 232.661)" }
    ];

    const { value: newData } = await Swal.fire({
        title: 'Edit Folder',
        html: `
      <input id="newName" class="swal2-input" placeholder="Folder Name" value="${oldData.folderName}">
      <div id="color-options" class="flex justify-center gap-4 mt-4">
        ${colorOptions.map((c, i) => `
          <label class="cursor-pointer" for="color-${i}">
            <input type="radio" name="color" id="color-${i}" value="${c.value}" class="hidden peer"
              ${oldData.color === c.value ? "checked" : ""}>
            <div class="w-10 h-10 rounded-full border-2 border-gray-300 peer-checked:border-4 peer-checked:border-black"
              style="background-color: ${c.display};"></div>
          </label>
        `).join('')}
      </div>
    `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            const name = document.getElementById('newName')?.value.trim();
            const selectedColor = document.querySelector('input[name="color"]:checked')?.value;

            if (!name || !selectedColor) {
                Swal.showValidationMessage('Please enter a name and choose a color');
                return false;
            }

            return {
                newName: name,
                newColor: selectedColor
            };
        }
    });

    if (newData) {
        return {
            oldName: selectedFolder,
            newName: newData.newName,
            newColor: newData.newColor
        };
    }

    return null;
}
//generic delete confirm modal
export async function deleteConfirm(callback, type) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: `Your ${type} has been deleted`,
                icon: "success",

            }).then(() =>
                callback()
            )

        }
    });
}

//create todoItem
export async function createTodoItemModal() {
    const { value: formValues } = await Swal.fire({
        title: 'Add New Task',
        html: `
        <form class="flex flex-col justify-center items-center">

      <input id="swal-task" class="swal2-input w-120 mt-4" placeholder="Task">


        <section class="flex justify-center items-center flex-col">
              <label for="swal-date" class="header text-xl">Due Date</label>
      <input id="swal-date" type="date" class="swal2-input w-120 h-20">
        </section>

        </form>


    `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            const task = document.getElementById('swal-task').value.trim();
            const dueDate = document.getElementById('swal-date').value;

            if (!task || !dueDate) {
                Swal.showValidationMessage('Both task and due date are required');
                return;
            }

            return { task, dueDate };
        },
    });

    return formValues; // { task, dueDate } or undefined if cancelled
}

//create todoGroup
export async function createTaskSet() {
    const { value: name } = await Swal.fire({
        title: "Enter Task Set Name",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "You need to write something!";
            }
        }
    });
    if (name) {
        Swal.fire(`Task Set ${name} has been created`);
        console.log(name)
    }
    return name;
}
//new custom event
export async function createEventModal() {
    const { value: formValues } = await Swal.fire({
        title: 'Add New Event',
        html: `
        <form class="flex flex-col justify-center items-center">
            <input id="swal-event" class="swal2-input w-120 mt-4" placeholder="Event">
                <section class="flex justify-center items-center flex-col">
                    <label for="swal-start-date" class="header text-xl">Start Date</label>
                    <input id="swal-start-date" type="date" class="swal2-input w-120 h-20">
                </section>

                <section class="flex justify-center items-center flex-col">
                    <label for="swal-end-date" class="header text-xl">End Date</label>
                    <input id="swal-end-date" type="date" class="swal2-input w-120 h-20">
                </section>
        </form>
    `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            const event = document.getElementById('swal-event').value.trim();
            const startDate = document.getElementById('swal-start-date').value;
            const endDate = document.getElementById('swal-end-date').value;

            const start = new Date(startDate);
            const end = new Date(endDate);

            //if empty
            if (!event || !startDate || !endDate) {
                Swal.showValidationMessage('No fields should be empty');
                return false;
            }
            //if not a date
            if (isNaN(start) || isNaN(end)) {
                Swal.showValidationMessage('Invalid date input');
                return false;
            }

            if (start > end) {
                Swal.showValidationMessage('Start date must be before end date');
                return false;
            }

            return {
                title: event,
                startDate: startDate,
                endDate: endDate
            };
        },
    });

    return formValues; // { task, dueDate } or undefined if cancelled
}
//delete event
export async function deleteEventModal(tempArr) {
    const options = Object.fromEntries(
        tempArr.map(({ id, title }) => [id, title])
    );

    const { value: selectedId } = await Swal.fire({
        title: "Delete Event",
        input: "select",
        inputOptions: options,
        inputPlaceholder: "Select Event",
        showCancelButton: true,
    });

    const selected = tempArr.find(e => e.id === selectedId);
    return selected || {};
}