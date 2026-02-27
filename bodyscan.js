document.addEventListener("DOMContentLoaded", function () {

    // ====================================
    // 🔐 CEK AKSES USER (ANTI LOOP)
    // ====================================
    const nama = localStorage.getItem("nama");
    const email = localStorage.getItem("email");
    const usia = localStorage.getItem("usia");

    if (!nama || !email || !usia) {
        window.location.replace("index.html");
        return;
    }

    // ====================================
    // ⚙️ SETUP AWAL
    // ====================================
    let isMeasuring = false;
    let intervalId = null;
    let lastValue = 0;

    const valueDisplay = document.getElementById("valueDisplay");
    const meterNeedle = document.getElementById("meterNeedle");
    const startStopBtn = document.getElementById("startStopBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");

    const resultPanel = document.getElementById("resultPanel");
    const finalAngle = document.getElementById("finalAngle");
    const resultStatus = document.getElementById("resultStatus");
    const closeResult = document.getElementById("closeResult");

    const homeBtn = document.getElementById("homeBtn");
    const lockIcon = document.getElementById("lockIcon");

    const MAX_ANGLE = 30;

    // ====================================
    // 🎯 MAP ROTASI JARUM
    // ====================================
    function mapValueToRotation(value) {
        return (value / MAX_ANGLE) * 45;
    }

    function updateDisplay(value) {
        lastValue = Math.round(value);
        valueDisplay.textContent = lastValue;
        meterNeedle.style.transform = `rotate(${mapValueToRotation(lastValue) + 180}deg)`;
    }

    // ====================================
    // ▶️ MULAI UKUR
    // ====================================
    function startMeasurement() {
        isMeasuring = true;
        startStopBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";

        intervalId = setInterval(() => {
            const randomValue =
                Math.floor(Math.random() * (2 * MAX_ANGLE + 1)) - MAX_ANGLE;
            updateDisplay(randomValue);
        }, 200);
    }

    // ====================================
    // ⏹️ SELESAI UKUR
    // ====================================
    function finishMeasurement() {
        isMeasuring = false;
        clearInterval(intervalId);

        pauseBtn.style.display = "none";
        startStopBtn.style.display = "inline-block";

        showResult(lastValue);

        localStorage.setItem("hasMeasured", "true");
        localStorage.setItem("lastScanResult", lastValue);

        unlockHome();
    }

    // ====================================
    // 📊 HASIL ANALISIS
    // ====================================
    function showResult(value) {
        finalAngle.textContent = value + "°";

        resultStatus.className = "result-status";

        if (Math.abs(value) <= 5) {
            resultStatus.textContent = "Normal ✅";
            resultStatus.classList.add("normal");
        } else if (Math.abs(value) <= 15) {
            resultStatus.textContent = "Perlu Perhatian ⚠";
            resultStatus.classList.add("warning");
        } else {
            resultStatus.textContent = "Risiko Tinggi ❗";
            resultStatus.classList.add("danger");
        }

        resultPanel.classList.add("show");
    }

    // ====================================
    // ❌ TUTUP HASIL
    // ====================================
    if (closeResult) {
        closeResult.addEventListener("click", () => {
            resultPanel.classList.remove("show");
        });
    }

    // ====================================
    // 🔘 EVENT BUTTON
    // ====================================
    startStopBtn?.addEventListener("click", startMeasurement);
    pauseBtn?.addEventListener("click", finishMeasurement);

    resetBtn?.addEventListener("click", () => {
        if (!isMeasuring) updateDisplay(0);
    });

    // ====================================
    // 🔓 HOME LOCK SYSTEM
    // ====================================
    if (localStorage.getItem("hasMeasured") === "true") {
        unlockHomeInstant();
    }

    function unlockHome() {
        homeBtn.classList.remove("locked");
        lockIcon.textContent = "🔓";

        setTimeout(() => {
            lockIcon.remove();
            homeBtn.classList.add("unlocked");
        }, 500);
    }

    function unlockHomeInstant() {
        homeBtn.classList.remove("locked");
        lockIcon?.remove();
        homeBtn.classList.add("unlocked");
    }

    homeBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        if (localStorage.getItem("hasMeasured") === "true") {
            window.location.href = "dashboard.html";
        }
    });

    // INIT
    updateDisplay(0);

});