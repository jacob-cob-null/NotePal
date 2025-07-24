import { Spinner } from "spin.js"

const alarmSound = new Audio('/alarm.m4a')
const clockSound = new Audio('/clock.m4a')

export const playAlarm = () => { alarmSound.play() }
export const playClock = () => { clockSound.play() }

//get day today
export function getCurrentDate() {
    const dateNow = new Date();
    const month = dateNow.getMonth() + 1;
    const day = dateNow.getDate();
    const year = dateNow.getFullYear();

    return `${month}/${day}/${year}`; // mm/dd/yyyy
} let currentSpinner = null;
//js loader during async operations
export function spinnerTrigger(isLoading, target) {
    if (!target) return;

    if (isLoading) {
        // Prevent multiple spinners
        if (currentSpinner) return;

        currentSpinner = new Spinner({
            lines: 12,
            length: 10,    // Increase length for visibility
            width: 4,      // Increase thickness
            radius: 10,    // Increase radius
            scale: 1,      // Ensure not scaled down
            corners: 1,
            color: '#4b5563',
            fadeColor: 'transparent',
            speed: 1,      // Rotations per second
            rotate: 0,
            animation: 'spinner-line-fade-quick',
            top: '50%',
            left: '50%',
            position: 'absolute',
        }).spin(target); // Automatically appends spinner.el
    } else {
        if (currentSpinner) {
            currentSpinner.stop(); // Removes it from DOM
            currentSpinner = null;
        }
    }
}
export function randColor() {
    const r = Math.floor(150 + Math.random() * 105);
    const g = Math.floor(150 + Math.random() * 105);
    const b = Math.floor(150 + Math.random() * 105);
    return `rgb(${r},${g},${b})`;
}