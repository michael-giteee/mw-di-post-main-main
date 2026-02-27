document.addEventListener('DOMContentLoaded', function () {

    // =====================================
    // 🔐 CEK LOGIN USER
    // =====================================
    const nama = localStorage.getItem("nama");

    if (!nama) {
        window.location.href = "index.html";
        return;
    }

    // =====================================
    // 🔧 KEY PROGRESS PER USER (AMAN)
    // =====================================
    const unlockedDayKey = `unlockedDay_${nama}`;

    // default buka sampai hari 2
    if (!localStorage.getItem(unlockedDayKey)) {
        localStorage.setItem(unlockedDayKey, "2");
    }

    let unlockedDay = parseInt(localStorage.getItem(unlockedDayKey));

    // =====================================
    // 🔒 SISTEM LOCK HARI
    // =====================================
    const allDays = document.querySelectorAll(".day-item");

    allDays.forEach((dayItem) => {

        const dayNumber = parseInt(dayItem.getAttribute("data-day"));
        const startBtn = dayItem.querySelector(".start-btn");

        if (!dayNumber || !startBtn) return;

        // reset UI dulu
        startBtn.disabled = false;
        startBtn.textContent = "Mulai";
        dayItem.classList.remove("locked");

        // 🔒 KUNCI HARI DI ATAS unlockedDay
        if (dayNumber > unlockedDay) {
            startBtn.disabled = true;
            startBtn.textContent = "🔒 Terkunci";
            dayItem.classList.add("locked");
        }

        // simpan data-day ke button (penting)
        startBtn.setAttribute("data-day", dayNumber);
    });

    // =====================================
    // ▶️ EVENT CLICK TOMBOL MULAI
    // =====================================
    const allStartBtns = document.querySelectorAll(".start-btn");

    allStartBtns.forEach(button => {

        button.addEventListener('click', function (e) {

            e.preventDefault();

            const day = parseInt(this.getAttribute("data-day"));
            if (!day) return;

            // extra safety
            if (day > unlockedDay) return;

            // simpan hari aktif
            localStorage.setItem("currentDay", day.toString());

            // redirect ke halaman latihan
            window.location.href = "hari2.html";
        });

    });

});
