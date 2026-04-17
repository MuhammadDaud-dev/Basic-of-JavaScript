// Selecting elements
const breakBtns = document.querySelectorAll('.div1 .btn');
const countdownEl = document.querySelector('.time');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const skipBtn = document.querySelector('.skip-btn');
const stopBtn = document.querySelector('.stop-btn');

// Variables
let duration = 0;
let totalDur = 0;
let timer = null;
let isRunning = false;
let currentMode = 0;

// Time presets
const times = [60, 180, 300]; // short, mid, long

// Break buttons
breakBtns[0].onclick = () => { currentMode = 0; setTime(times[0]); };
breakBtns[1].onclick = () => { currentMode = 1; setTime(times[1]); };
breakBtns[2].onclick = () => { currentMode = 2; setTime(times[2]); };

// Set time
function setTime(time){
    clearInterval(timer);
    duration = time;
    totalDur = time;
    isRunning = false;
    startBtn.textContent = "Start ▶";
    updateDisplay();
    updateCircle();
}

// Display
function updateDisplay() {
    let m = Math.floor(duration / 60);
    let s = duration % 60;

    countdownEl.textContent =
        `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Timer logic
function updateTimer() {
    if (duration > 0) {
        duration--;
        updateDisplay();
        updateCircle();
    } else {
        clearInterval(timer);
        isRunning = false;
        countdownEl.textContent = "Time up!";
        startBtn.textContent = "Start ▶";
    }
}

// Start / Pause
startBtn.onclick = () => {
    if (duration === 0) {
        alert("Select a break first!");
        return;
    }

    if (!isRunning) {
        timer = setInterval(updateTimer, 1000);
        startBtn.textContent = "Pause ⏸";
        isRunning = true;
    } else {
        clearInterval(timer);
        startBtn.textContent = "Resume ▶";
        isRunning = false;
    }
};

// Reset
resetBtn.onclick = () => {
    clearInterval(timer);
    duration = totalDur;
    isRunning = false;
    startBtn.textContent = "Start ▶";
    updateDisplay();
    updateCircle();
};

// Skip (Next Mode)
skipBtn.onclick = () => {
    currentMode = (currentMode + 1) % 3;
    setTime(times[currentMode]);
};

// Stop
stopBtn.onclick = () => {
    if(isRunning){
    clearInterval(timer);
    duration = 0;
    totalDur = 0;
    isRunning = false;
    countdownEl.textContent = "Stopped";
    startBtn.textContent = "Start ▶";
    updateCircle();}
};

// Circle animation
function updateCircle() {
    const percent = totalDur ? (duration / totalDur) * 100 : 0;

    countdownEl.style.background =
        `conic-gradient(skyblue ${percent}%, #222 ${percent}%)`;
}