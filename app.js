const tg = window.Telegram.WebApp;
tg.expand();

// ---------- STATE ----------
let water = 0;
let currentDate = new Date();
let selectedDay = null;

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
    let percent = water / 2000;
    let deg = percent * 360;

    document.getElementById("waterCircle").style.background =
        `conic-gradient(#22c55e ${deg}deg, #1e293b ${deg}deg)`;

    document.getElementById("waterVal").innerText = water + " мл";
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

    let cal = document.getElementById("calendar");
    cal.innerHTML = "";

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    let firstDay = new Date(year, month, 1).getDay();
    let days = new Date(year, month + 1, 0).getDate();

    document.getElementById("monthTitle").innerText =
        currentDate.toLocaleString("ru", { month: "long", year: "numeric" });

    for (let i = 0; i < firstDay; i++) {
        cal.innerHTML += "<div></div>";
    }

    for (let i = 1; i <= days; i++) {

        let el = document.createElement("div");
        el.className = "day";
        el.innerText = i;

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

    document.getElementById("dayTitle").innerText =
        currentDate.toLocaleDateString() + " / " + day;

    switchScreen("dayScreen");
}

function saveWorkout() {
    alert("🔥 Сохранено");
}

// ---------- INIT ----------
updateWater();
