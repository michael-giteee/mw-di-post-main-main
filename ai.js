// ===============================
// AI RepoSe Assistant
// Versi: TANPA VALIDASI AKSES
// ===============================

// ===============================
// SETUP AWAL
// ===============================
let isMeasuring = false;
let intervalId = null;

const valueDisplay = document.getElementById('valueDisplay');
const meterNeedle = document.getElementById('meterNeedle');
const startStopBtn = document.getElementById('startStopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const MAX_ANGLE = 30; // -30 sampai 30

// ===============================
// Mapping Sudut ke Rotasi Jarum
// ===============================
function mapValueToRotation(value) {
    const normalized = (value + MAX_ANGLE) / (2 * MAX_ANGLE);
    return normalized * 180;
}

function updateDisplay(newValue) {
    const displayValue = Math.round(newValue);

    if (valueDisplay) {
        valueDisplay.textContent = displayValue;
    }

    if (meterNeedle) {
        const rotation = mapValueToRotation(displayValue);
        meterNeedle.style.transform = `rotate(${rotation}deg)`;
    }
}

// ===============================
// Kontrol Pengukuran
// ===============================
function startMeasurement() {
    isMeasuring = true;

    if (startStopBtn) startStopBtn.style.display = "none";
    if (pauseBtn) pauseBtn.style.display = "inline-block";

    intervalId = setInterval(() => {
        const newValue =
            Math.floor(Math.random() * (2 * MAX_ANGLE + 1)) - MAX_ANGLE;
        updateDisplay(newValue);
    }, 200);
}

function pauseMeasurement() {
    isMeasuring = false;

    clearInterval(intervalId);
    intervalId = null;

    if (pauseBtn) pauseBtn.style.display = "none";
    if (startStopBtn) startStopBtn.style.display = "inline-block";

    // Simpan status (opsional)
    localStorage.setItem("hasMeasured", "true");
}

function resetMeasurement() {
    isMeasuring = false;

    clearInterval(intervalId);
    intervalId = null;

    if (pauseBtn) pauseBtn.style.display = "none";
    if (startStopBtn) startStopBtn.style.display = "inline-block";

    updateDisplay(0);
}

// ===============================
// Event Listeners (AMAN)
// ===============================
if (startStopBtn) startStopBtn.addEventListener('click', startMeasurement);
if (pauseBtn) pauseBtn.addEventListener('click', pauseMeasurement);
if (resetBtn) resetBtn.addEventListener('click', resetMeasurement);

// ===============================
// Tampilan Awal
// ===============================
updateDisplay(0);
