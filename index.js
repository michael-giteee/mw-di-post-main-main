// =====================================
// 🌐 TRANSLATION SYSTEM
// =====================================
const translations = {
    id: {
        tagline: "Perbaiki posturmu, perbaiki hidupmu",
        label_nama: "Nama Lengkap",
        label_email: "Email",
        btn_submit: "Mulai Perjalanan Postur"
    },
    en: {
        tagline: "Improve your posture, improve your life",
        label_nama: "Full Name",
        label_email: "Email Address",
        btn_submit: "Start Posture Journey"
    }
};

const languageSelect = document.getElementById("languageSelect");

if (languageSelect) {
    languageSelect.addEventListener("change", (e) => {
        changeLanguage(e.target.value);
    });
}

function changeLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// =====================================
// 🧾 REGISTER / LOGIN SYSTEM
// =====================================
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = document.getElementById("nama_lengkap").value.trim();
        const email = document.getElementById("email").value.trim();
        const usiaInput = document.getElementById("usia").value;
        const usia = parseInt(usiaInput);

        if (!nama || !email || !usiaInput) {
            alert("Semua data harus diisi!");
            return;
        }

        if (usia < 17) {
            alert("Usia belum memenuhi syarat.");
            return;
        }

        // =====================================
        // 🔍 CEK USER LAMA
        // =====================================
        const savedNama = localStorage.getItem("nama");
        const savedEmail = localStorage.getItem("email");
        const savedUsia = localStorage.getItem("usia");
        const hasMeasured = localStorage.getItem("hasMeasured");

        if (
            savedNama === nama &&
            savedEmail === email &&
            String(savedUsia) === usiaInput &&
            hasMeasured === "true"
        ) {
            window.location.href = "dashboard.html";
            return;
        }

        // =====================================
        // 👤 USER BARU / RESET SESSION
        // =====================================
        localStorage.clear();

        let kelompokUsia = usia <= 55 ? "kelompok1" : "kelompok2";

        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("usia", usia);
        localStorage.setItem("kelompokUsia", kelompokUsia);

        // status awal
        localStorage.setItem("hasMeasured", "false");
        localStorage.setItem("hasBodyScan", "false");

        // redirect ke bodyscan
        window.location.href = "bodyscan.html";
    });

});