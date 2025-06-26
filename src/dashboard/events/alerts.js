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
export function msgAlert(msg){
    Swal.fire({
        title: msg,
        position: 'top'
    })
}