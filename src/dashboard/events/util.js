const alarmSound = new Audio('/alarm.m4a')
const clockSound = new Audio('/clock.m4a')

export const playAlarm = () => { alarmSound.play() }
export const playClock = () => { clockSound.play() }

//get day todar
export function getCurrentDate() {
    const dateNow = new Date();
    const month = dateNow.getMonth() + 1;
    const day = dateNow.getDate();
    const year = dateNow.getFullYear();

    return `${month}/${day}/${year}`; // mm/dd/yyyy
}
