// ===============================
// 🔐 CEK AKSES (WAJIB SUDAH ISI DATA)
// ===============================
const isRegistered = localStorage.getItem("isRegistered");

if (!isRegistered) {
    alert("Silakan isi data terlebih dahulu!");
    window.location.href = "index.html";
}

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
    valueDisplay.textContent = displayValue;

    const rotation = mapValueToRotation(displayValue);
    meterNeedle.style.transform = `rotate(${rotation}deg)`;
}

// ===============================
// Kontrol Pengukuran
// ===============================
function startMeasurement() {
    isMeasuring = true;

    startStopBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";

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

    pauseBtn.style.display = "none";
    startStopBtn.style.display = "inline-block";

    // ✅ SIMPAN STATUS SUDAH MELAKUKAN PENGUKURAN
    localStorage.setItem("hasMeasured", "true");
}

function resetMeasurement() {
    isMeasuring = false;

    clearInterval(intervalId);
    intervalId = null;

    pauseBtn.style.display = "none";
    startStopBtn.style.display = "inline-block";

    updateDisplay(0);
}

// ===============================
// Event Listeners
// ===============================
startStopBtn.addEventListener('click', startMeasurement);
pauseBtn.addEventListener('click', pauseMeasurement);
resetBtn.addEventListener('click', resetMeasurement);

// Tampilan awal
updateDisplay(0);
