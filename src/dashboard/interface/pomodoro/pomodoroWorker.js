let timerId;
let remainingSeconds = 0;

self.onmessage = (e) => {
    const { type, duration } = e.data;

    if (type === 'start') {
        if (duration !== undefined) {
            remainingSeconds = duration;
        }
        startCountdown(remainingSeconds);
    }

    if (type === 'pause') {
        clearInterval(timerId);
    }

    if (type === 'reset') {
        clearInterval(timerId);
        remainingSeconds = duration ?? 1500;
        self.postMessage({ type: 'tick', timeLeft: formatTime(remainingSeconds) });
    }

    if (type === 'shortBreak') {
        startCountdown(300); // 5 minutes
    }

    if (type === 'longBreak') {
        startCountdown(900); // 15 minutes
    }
};

function startCountdown(seconds) {
    clearInterval(timerId);
    remainingSeconds = seconds;

    timerId = setInterval(() => {
        remainingSeconds--;

        self.postMessage({
            type: 'tick',
            timeLeft: formatTime(remainingSeconds),
        });

        if (remainingSeconds <= 0) {
            clearInterval(timerId);
            self.postMessage({ type: 'complete' });
        }
    }, 1000);
}

function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
}
