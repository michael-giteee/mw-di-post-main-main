const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const finishButton = document.getElementById('finish-button');

const measurementValue = document.getElementById('measurement-value');
const gaugeLine = document.getElementById('gauge-line');
const interpretationText = document.getElementById('interpretation-text');

const resultScreen = document.getElementById('result-screen');
const resultAngle = document.getElementById('result-angle');
const resultMessage = document.getElementById('result-message');

let isMeasuring = false;
let zeroOffset = 0;
let lastAngle = 0;

function updateGauge(angle) {

    const correctedAngle = angle - zeroOffset;
    lastAngle = Math.abs(correctedAngle);

    const displayAngle = Math.min(Math.max(correctedAngle, -30), 30);

    gaugeLine.style.transform = `rotate(${displayAngle}deg)`;
    measurementValue.textContent = `${lastAngle.toFixed(1)}°`;

    const absAngle = lastAngle;

    if (absAngle >= 7) {
        gaugeLine.style.backgroundColor = 'red';
        interpretationText.style.color = 'red';
        interpretationText.textContent =
            `Rotasi: ${absAngle.toFixed(1)}°. Waspada, disarankan konsultasi medis.`;
    } else if (absAngle >= 5) {
        gaugeLine.style.backgroundColor = 'orange';
        interpretationText.style.color = 'orange';
        interpretationText.textContent =
            `Rotasi: ${absAngle.toFixed(1)}°. Perlu pemantauan rutin.`;
    } else {
        gaugeLine.style.backgroundColor = '#4863f7';
        interpretationText.style.color = '#666';
        interpretationText.textContent =
            `Rotasi: ${absAngle.toFixed(1)}°. Dalam batas normal.`;
    }
}

function handleOrientation(event) {
    if (!isMeasuring) return;

    let tilt = 0;

    const isLandscape = window.matchMedia("(orientation: landscape)").matches;

    if (isLandscape) {
        tilt = event.beta;
    } else {
        tilt = event.gamma;
    }

    tilt = -tilt;

    updateGauge(tilt);
}

async function lockLandscape() {
    try {
        if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock("landscape");
        }
    } catch (err) {
        console.log("Landscape lock gagal:", err);
    }
}

async function unlockPortrait() {
    try {
        if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock("portrait");
        }
    } catch (err) {
        console.log("Portrait lock gagal:", err);
    }
}

function startMeasurement() {
    if (isMeasuring) return;

    isMeasuring = true;

    // 🔥 Ubah teks jadi Mengukur...
    startButton.textContent = "Mengukur...";
    startButton.classList.add("measuring");

    // Tampilkan tombol selesai
    finishButton.style.display = "inline-block";

    lockLandscape();

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener("deviceorientation", handleOrientation);
                } else {
                    alert("Izin sensor ditolak.");
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("deviceorientation", handleOrientation);
    }
}

function finishMeasurement() {
    isMeasuring = false;
    window.removeEventListener("deviceorientation", handleOrientation);

    unlockPortrait();

    document.querySelector(".gauge-container").style.display = "none";
    document.querySelector(".controls").style.display = "none";
    document.querySelector(".interpretation-area").style.display = "none";

    resultScreen.style.display = "block";
    resultAngle.textContent = `${lastAngle.toFixed(1)}°`;

    if (lastAngle >= 7) {
        resultMessage.textContent = "Hasil menunjukkan indikasi rotasi signifikan. Disarankan konsultasi medis.";
        resultMessage.style.color = "red";
    } else if (lastAngle >= 5) {
        resultMessage.textContent = "Perlu pemantauan rutin.";
        resultMessage.style.color = "orange";
    } else {
        resultMessage.textContent = "Dalam batas normal.";
        resultMessage.style.color = "#4863f7";
    }
}

function resetMeasurement() {
    isMeasuring = false;

    window.removeEventListener("deviceorientation", handleOrientation);

    zeroOffset = 0;
    updateGauge(0);

    // 🔁 Balikin tombol ke awal
    startButton.textContent = "Mulai Pengukuran";
    startButton.classList.remove("measuring");

    finishButton.style.display = "none";

    interpretationText.textContent =
        'Tekan "Mulai Pengukuran" untuk memulai proses.';
}

startButton.addEventListener('click', startMeasurement);
resetButton.addEventListener('click', resetMeasurement);
finishButton.addEventListener('click', finishMeasurement);

finishButton.style.display = "none";
updateGauge(0);

