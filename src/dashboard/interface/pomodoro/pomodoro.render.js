import { pomodoro, updateStatus } from "./pomodoro-ui";
import { mainWorkspace } from "../components";

export function initPomodoro(target) {
    const worker = new Worker(new URL('./pomodoroWorker.js', import.meta.url), {
        type: 'module',
    });

    const pomodoroComponent = pomodoro()
    pomodoroComponent.createPomodoro(target);

    const container = pomodoroComponent.getContainer();

    //events
    const { playBtn, stopBtn, resetBtn, statusLabel, statusDot, shortBreak, longBreak } = pomodoroComponent.getElements()

    let isRunning = false
    playBtn.addEventListener('click', () => {
        updateStatus(mainWorkspace, 'bg-red-100', statusLabel, "Focus Mode", statusDot, 'bg-red-300');
        if (!isRunning) {
            // Only update status when starting for the first time

            worker.postMessage({ type: 'start', duration: 1500 });
            isRunning = true;
        } else {
            // Resume without changing status/color
            worker.postMessage({ type: 'start' });
        }
    });

    stopBtn.addEventListener('click', () => {
        worker.postMessage({ type: 'pause' });
    });

    resetBtn.addEventListener('click', () => {
        worker.postMessage({ type: 'reset' });
        isRunning = false; // Reset the running state
    });

    shortBreak.addEventListener('click', () => {
        worker.postMessage({ type: 'shortBreak' });
        updateStatus(mainWorkspace, 'bg-blue-100', statusLabel, "Short Break", statusDot, 'bg-blue-300');
        isRunning = true; // Set running state for break
    });

    longBreak.addEventListener('click', () => {
        worker.postMessage({ type: 'longBreak' });
        updateStatus(mainWorkspace, 'bg-green-100', statusLabel, "Long Break", statusDot, 'bg-green-300');
        isRunning = true; // Set running state for break
    });

    worker.onmessage = (e) => {
        if (e.data.type === 'tick') {
            pomodoroComponent.updateTimer(e.data.timeLeft)
        }
        // Handle timer completion
        if (e.data.type === 'complete') {
            isRunning = false;
        }
    }
}