// ===== STATE =====
let water = parseInt(localStorage.getItem("water") || "0");
let currentDate = new Date();

// МЕСЯЦЫ
const months = [
"Январь","Февраль","Март","Апрель","Май","Июнь",
"Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

// ===== NAVIGATION =====
function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

// ОТКРЫТИЕ
function openObservations() {
    switchScreen("obsScreen");
}

function openWater() {
    switchScreen("waterScreen");
}

function openCalendar() {
    drawCalendar();
    switchScreen("calendarScreen");
}

// НАЗАД
function backMain() {
    switchScreen("main");
}

function backObs() {
    switchScreen("obsScreen");
}

// ===== 💧 WATER =====
function updateWater() {
    let percent = Math.min(water / 2000, 1);
    let height = percent * 100;

    document.getElementById("waterFill").style.height = height + "%";
    document.getElementById("waterVal").innerText = water + " мл";

    localStorage.setItem("water", water);
}

function addWater() {
    water += 250;
    updateWater();
}

function removeWater() {
    water = Math.max(0, water - 250);
    updateWater();
}

// ===== 📅 CALENDAR =====
function drawCalendar() {

    let cal = document.getElementById("calendar");
    cal.innerHTML = "";

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    document.getElementById("monthTitle").innerText =
        months[month] + " " + year;

    let firstDay = new Date(year, month, 1).getDay();
    let days = new Date(year, month + 1, 0).getDate();

    // ПОНЕДЕЛЬНИК СТАРТ
    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    // ПУСТЫЕ ЯЧЕЙКИ
    for (let i = 0; i < firstDay; i++) {
        cal.appendChild(document.createElement("div"));
    }

    let today = new Date();

    for (let i = 1; i <= days; i++) {

        let el = document.createElement("div");
        el.className = "day";
        el.innerText = i;

        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            el.classList.add("today");
        }

        cal.appendChild(el);
    }
}

// ЛИСТАНИЕ
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    drawCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    drawCalendar();
}

// ===== INIT =====
switchScreen("main");
updateWater();
