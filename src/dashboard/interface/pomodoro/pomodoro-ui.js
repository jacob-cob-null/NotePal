export function pomodoro() {
    let container;
    let playBtn, stopBtn, resetBtn, statusLabel, statusDot, shortBreak, longBreak;

    function createPomodoro(target) {
        if (!target) return;

        container = document.createElement('div');
        container.className =
            'w-full sm:w-[950px] h-full sm:h-[600px] bg-white outline-1 outline-gray-200 rounded-xl self-center flex flex-col justify-center items-center p-8 shadow-lg';

        // --- Status + Timer ---
        const statusSection = document.createElement('section');
        statusSection.className = 'flex flex-col items-center justify-center';

        const statusBar = document.createElement('section');
        statusBar.className =
            'font-body text-xl mb-3 text-gray-500 h-9 w-50 px-4 py-1 flex justify-around items-center bg-gray-100 rounded-xl outline-1 outline-gray-200 shadow-md';

        statusDot = document.createElement('div');
        statusDot.className = 'h-4 w-4 bg-red-400 rounded-full';

        statusLabel = document.createElement('h3');
        statusLabel.textContent = 'Focus mode!';
        statusLabel.className = 'ml-2';

        statusBar.append(statusDot, statusLabel);

        const timerDisplay = document.createElement('h1');
        timerDisplay.id = 'timer';
        timerDisplay.textContent = '25:00';
        timerDisplay.className = 'text-[90px] sm:text-[250px] leading-none font-head text-gray-700';

        statusSection.append(statusBar, timerDisplay);

        // --- Controls ---
        const controlSection = document.createElement('section');
        controlSection.className = 'grid grid-cols-3 gap-4 mt-4';

        const resetIconWrap = document.createElement('div');
        resetIconWrap.className = 'flex justify-center items-center';
        resetBtn = document.createElement('i');
        resetBtn.className = 'bx bx-rotate-cw text-gray-500 text-5xl cursor-pointer';
        resetIconWrap.appendChild(resetBtn);

        const playIconWrap = document.createElement('div');
        playIconWrap.className = 'flex justify-center items-center';
        const playCircle = document.createElement('div');
        playCircle.className = 'flex items-center justify-center w-20 h-20 bg-red-400 rounded-full cursor-pointer';
        playBtn = document.createElement('i');
        playBtn.className = 'bx bx-play text-white text-6xl ml-1';
        playCircle.appendChild(playBtn);
        playIconWrap.appendChild(playCircle);

        const stopIconWrap = document.createElement('div');
        stopIconWrap.className = 'flex justify-center items-center';
        stopBtn = document.createElement('i');
        stopBtn.className = 'bx bx-stop text-gray-500 text-6xl cursor-pointer';
        stopIconWrap.appendChild(stopBtn);

        controlSection.append(resetIconWrap, playIconWrap, stopIconWrap);

        // --- Break Buttons ---
        const breakButtons = document.createElement('div');
        breakButtons.className = 'flex flex-col sm:flex-row w-full justify-center items-center mt-10 gap-4';

        shortBreak = document.createElement('button');
        shortBreak.className = 'button text-gray-500 w-full  sm:w-30';
        shortBreak.textContent = 'Short Break';

        longBreak = document.createElement('button');
        longBreak.className = 'button text-gray-500 w-full sm:w-30';
        longBreak.textContent = 'Long Break';

        breakButtons.append(shortBreak, longBreak);

        container.append(statusSection, controlSection, breakButtons);
        target.appendChild(container);
    }

    function updateTimer(newTimer) {
        const timer = container.querySelector('#timer');
        if (timer) timer.textContent = newTimer;
    }

    function getContainer() {
        return container;
    }

    function getElements() {
        return { playBtn, stopBtn, resetBtn, statusLabel, statusDot, shortBreak, longBreak };
    }

    return {
        createPomodoro,
        updateTimer,
        getContainer,
        getElements
    };
}

export function updateStatus(target, newColor, label, text, dot, dotcol) {
    label.textContent = text;

    // Remove all background color classes
    const removeBackgroundClasses = (element) => {
        const classesToRemove = [];
        element.classList.forEach(className => {
            if (className.startsWith('bg-') && className.includes('-')) {
                classesToRemove.push(className);
            }
        });
        element.classList.remove(...classesToRemove);
    };

    removeBackgroundClasses(target);
    target.classList.add(newColor);

    removeBackgroundClasses(dot);
    dot.classList.add(dotcol);
}