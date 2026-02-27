document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // Ambil elemen dari DOM
    // ==============================

    const postureToggle = document.getElementById('postureToggle');
    const exerciseToggle = document.getElementById('exerciseToggle');
    const frequencySelect = document.getElementById('frequencySelect');
    const freqLabel = document.getElementById('freqLabel');
    const logoutBtn = document.querySelector(".logout-btn");

    // ==============================
    // Posture Reminder
    // ==============================

    if (postureToggle) {
        postureToggle.addEventListener('change', () => {
            console.log("Posture Reminder aktif:", postureToggle.checked);
        });
    }

    // ==============================
    // Frekuensi
    // ==============================

    if (frequencySelect && freqLabel) {
        frequencySelect.addEventListener('change', (e) => {
            const value = e.target.value;
            freqLabel.textContent = `Setiap ${value} menit`;
            console.log("Frekuensi diubah menjadi:", value, "menit");
        });
    }

    // ==============================
    // Latihan Harian
    // ==============================

    if (exerciseToggle) {
        exerciseToggle.addEventListener('change', () => {
            console.log("Latihan Harian aktif:", exerciseToggle.checked);
        });
    }

    // ==============================
    // 🔒 LOGOUT
    // ==============================

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {

            const konfirmasi = confirm("Yakin ingin keluar?");

            if (konfirmasi) {
                localStorage.removeItem("kelompokUsia");
                window.location.href = "index.html";
            }

        });
    }

});
