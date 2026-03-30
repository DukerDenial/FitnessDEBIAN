const tg = window.Telegram.WebApp;
tg.expand();

// STATE
let water = localStorage.getItem("water") || 0;
water = parseInt(water);

let currentDate = new Date();

const months = [
"Январь","Февраль","Март","Апрель","Май","Июнь",
"Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

// NAV
function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function openCalendar() {
    drawCalendar();
    switchScreen("calendarScreen");
}

// WATER
function updateWater() {
    let percent = Math.min(water / 2000, 1);
    document.getElementById("waterFill").style.height = percent * 100 + "%";
    document.getElementById("waterVal").innerText = water + " мл";

    localStorage.setItem("water", water);
}

function vibrate() {
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred("medium");
    }
}

function addWater() {
    water += 250;
    vibrate();
    spawnBubbles();
    updateWater();
}

function removeWater() {
    water = Math.max(0, water - 250);
    updateWater();
}

// BUBBLES
function spawnBubbles() {
    let container = document.getElementById("bubbles");

    for (let i = 0; i < 5; i++) {
        let b = document.createElement("div");
        b.className = "bubble";
        b.style.left = Math.random() * 80 + "px";
        container.appendChild(b);

        setTimeout(() => b.remove(), 2000);
    }
}

// CALENDAR
function drawCalendar() {

    let cal = document.getElementById("calendar");
    cal.innerHTML = "";

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    document.getElementById("monthTitle").innerText =
        months[month] + " " + year;

    let days = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= days; i++) {
        let el = document.createElement("div");
        el.className = "day";
        el.innerText = i;
        cal.appendChild(el);
    }
}

// SWIPE
let startX = 0;

document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
    let diff = e.changedTouches[0].clientX - startX;

    if (diff > 80) switchScreen("main");
    if (diff < -80) openCalendar();
});

// INIT
updateWater();
