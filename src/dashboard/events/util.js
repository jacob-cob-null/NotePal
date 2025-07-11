const alarmSound = new Audio('/alarm.m4a')
const clockSound = new Audio('/clock.m4a')

export const playAlarm = () => { alarmSound.play() }
export const playClock = () => { clockSound.play() }
