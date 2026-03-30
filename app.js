const tg = window.Telegram.WebApp;
tg.expand();

// ---------- STATE ----------
let water = 0;
let currentDate = new Date();
let selectedDay = null;

const months = [
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

// ---------- NAV ----------
function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

function openCalendar() {
    drawCalendar();
    switchScreen("calendarScreen");
}

function backMain() {
    switchScreen("main");
}

function backCalendar() {
    switchScreen("calendarScreen");
}

// ---------- WATER ----------
function updateWater() {
    let percent = Math.min(water / 2000, 1);
    let deg = percent * 360;

    const circle = document.getElementById("waterCircle");

    circle.style.background =
        `conic-gradient(#22c55e ${deg}deg, #1e293b ${deg}deg)`;

    document.getElementById("waterVal").innerText = water + " мл";

    // 🔥 анимация
    circle.style.transform = "scale(1.05)";
    setTimeout(() => circle.style.transform = "scale(1)", 150);
}

function addWater() {
    water += 250;
    updateWater();
}

function removeWater() {
    water = Math.max(0, water - 250);
    updateWater();
}

// ---------- CALENDAR ----------
function drawCalendar() {

    const cal = document.getElementById("calendar");
    cal.innerHTML = "";

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    document.getElementById("monthTitle").innerText =
        months[month] + " " + year;

    let firstDay = new Date(year, month, 1).getDay();
    let days = new Date(year, month + 1, 0).getDate();

    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < firstDay; i++) {
        cal.innerHTML += "<div></div>";
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
            el.classList.add("active");
        }

        el.onclick = () => openDay(i);

        cal.appendChild(el);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    drawCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    drawCalendar();
}

// ---------- DAY ----------
function openDay(day) {
    selectedDay = day;

    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();

    document.getElementById("dayTitle").innerText =
        day + " " + months[month] + " " + year;

    switchScreen("dayScreen");
}

function saveWorkout() {
    let text = document.getElementById("workout").value;

    if (!text) {
        alert("Введите тренировку");
        return;
    }

    alert("🔥 Сохранено: " + text);

    document.getElementById("workout").value = "";
}

// ---------- INIT ----------
updateWater();
