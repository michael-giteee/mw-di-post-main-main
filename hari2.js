document.addEventListener('DOMContentLoaded', function () {

    // ============================
    // 🔐 CEK LOGIN
    // ============================
    const nama = localStorage.getItem("nama");

    if (!nama) {
        window.location.href = "index.html";
        return;
    }

    // ============================
    // 🔑 KEY KHUSUS USER (INTI FIX)
    // ============================
    const USER_KEY = `hari2_${nama}`;

    const PROGRESS_KEY = `${USER_KEY}_exerciseProgress`;
    const UNLOCKED_DAY_KEY = `${USER_KEY}_unlockedDay`;

    // ============================
    // AMBIL SEMUA LATIHAN
    // ============================
    const allExercises = document.querySelectorAll(".exercise-item");
    const exercises = Array.from(allExercises);

    const progressText = document.querySelector(".small-text");

    // ============================
    // TIMER ELEMENT
    // ============================
    const timerSelect = document.getElementById("timerSelect");
    const timerDisplay = document.getElementById("timerDisplay");
    const startMissionBtn = document.getElementById("startMissionBtn");
    const finishMissionBtn = document.getElementById("finishMissionBtn");

    let timerInterval = null;
    let timeLeft = 60;
    let isTimerRunning = false;

    // ============================
    // LOAD PROGRESS (PER USER)
    // ============================
    let currentIndex =
        parseInt(localStorage.getItem(PROGRESS_KEY)) || 0;

    // ============================
    // UPDATE UI
    // ============================
    function updateActiveExercise() {

        exercises.forEach((item, index) => {

            item.classList.remove("active-exercise", "locked-exercise");

            if (index === currentIndex) {
                item.classList.add("active-exercise");
                item.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            else if (index > currentIndex) {
                item.classList.add("locked-exercise");
            }
        });

        const progress = Math.round((currentIndex / exercises.length) * 100);
        if (progressText) {
            progressText.textContent = `Progress ${progress}%`;
        }
    }

    // ============================
    // TIMER DISPLAY
    // ============================
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent =
            `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    // ============================
    // START TIMER
    // ============================
    function startTimer() {

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        timeLeft = parseInt(timerSelect.value);
        isTimerRunning = true;
        updateTimerDisplay();

        timerInterval = setInterval(() => {

            if (!isTimerRunning) return;

            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                finishMission();
            }

        }, 1000);
    }

    // ============================
    // FINISH MISSION
    // ============================
    function finishMission() {

        if (!isTimerRunning) return;

        clearInterval(timerInterval);
        timerInterval = null;
        isTimerRunning = false;

        alert("🎉 Misi selesai!");

        currentIndex++;

        // 💾 SIMPAN PROGRES KHUSUS USER
        localStorage.setItem(PROGRESS_KEY, currentIndex);

        updateActiveExercise();

        // kalau semua latihan hari 2 selesai
        if (currentIndex >= exercises.length) {

            alert("Semua latihan Hari 2 selesai! ✅");

            let unlockedDay =
                parseInt(localStorage.getItem(UNLOCKED_DAY_KEY)) || 2;

            let currentDay = 2;

            if (currentDay >= unlockedDay) {
                localStorage.setItem(
                    UNLOCKED_DAY_KEY,
                    currentDay + 1
                );
            }

            window.location.href = "programlatihan.html";
        }
    }

    // ============================
    // BUTTON EVENTS
    // ============================
    if (startMissionBtn) {
        startMissionBtn.addEventListener("click", startTimer);
    }

    if (finishMissionBtn) {
        finishMissionBtn.addEventListener("click", finishMission);
    }

    // ============================
    // VIDEO FULLSCREEN
    // ============================
    document.querySelectorAll("video").forEach(video => {
        video.addEventListener("click", () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        });
    });

    // ============================
    // INIT
    // ============================
    updateActiveExercise();

});
