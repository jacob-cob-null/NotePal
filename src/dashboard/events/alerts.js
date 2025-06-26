import Swal from 'sweetalert2'

export function successfulLogin(name) {
    Swal.fire({
        title: "Login Successful",
        text: `Welcome to NotePal! ${name}`,
        icon: "success"
    });
}
export function failedLogin() {
    Swal.fire({
        title: `Login Failed`,
        text: "Oops! That login didn’t work.<br> Double-check your email and password.",
        icon: "error"
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
export async function noteGroupModal() {
    const { isConfirmed, value } = await Swal.fire({
        html: `
      <input id="folderName" class="swal2-input" placeholder="Enter folder name">
      <div id="color-options" style="display: flex; gap: 1em; justify-content: center; margin-top: 1em;">
        <label style="cursor: pointer;">
          <input type="radio" name="color" value="bg-red-400" style="display: none;">
          <div class="color-circle" style="width: 40px; height: 40px; background-color: oklch(70.4% 0.191 22.216); border-radius: 50%; border: 2px solid #ccc;"></div>
        </label>
        <label style="cursor: pointer;">
          <input type="radio" name="color" value="bg-orange-300" style="display: none;">
          <div class="color-circle" style="width: 40px; height: 40px; background-color: oklch(83.7% 0.128 66.29); border-radius: 50%; border: 2px solid #ccc;"></div>
        </label>
        <label style="cursor: pointer;">
          <input type="radio" name="color" value="bg-green-400" style="display: none;">
          <div class="color-circle" style="width: 40px; height: 40px; background-color: oklch(79.2% 0.209 151.711); border-radius: 50%; border: 2px solid #ccc;"></div>
        </label>
        <label style="cursor: pointer;">
          <input type="radio" name="color" value="bg-sky-400" style="display: none;">
          <div class="color-circle" style="width: 40px; height: 40px; background-color: oklch(74.6% 0.16 232.661); border-radius: 50%; border: 2px solid #ccc;"></div>
        </label>
      </div>
    `,
        didOpen: () => {
            const labels = Swal.getPopup().querySelectorAll('label');
            labels.forEach(label => {
                label.addEventListener('click', () => {
                    labels.forEach(l => l.querySelector('.color-circle').style.border = '2px solid #ccc');
                    label.querySelector('.color-circle').style.border = '4px solid black';
                });
            });
        },
        focusConfirm: false,
        title: "Create Folder",
        showCancelButton: true,
        preConfirm: () => {
            const folderName = document.getElementById('folderName').value.trim();
            const selectedColor = document.querySelector('input[name="color"]:checked');

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
