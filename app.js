let water = parseInt(localStorage.getItem("water") || "0");
let currentDate = new Date();
let selectedDate = "";

const months = [
"Январь","Февраль","Март","Апрель","Май","Июнь",
"Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

// NAV
function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function openObservations() { switchScreen("obsScreen"); }
function openWater() { switchScreen("waterScreen"); }
function openWeight() { loadWeight(); switchScreen("weightScreen"); }
function openCalendar() { drawCalendar(); switchScreen("calendarScreen"); }

function backMain() { switchScreen("main"); }
function backObs() { switchScreen("obsScreen"); }
function backCalendar() { switchScreen("calendarScreen"); }

// WATER
function updateWater() {
    let percent = water / 2000;
    document.getElementById("waterFill").style.height = percent * 100 + "%";
    document.getElementById("waterVal").innerText = water + " мл";
    localStorage.setItem("water", water);
}

function addWater() { water += 250; updateWater(); }
function removeWater() { water = Math.max(0, water - 250); updateWater(); }

// WEIGHT
function saveWeight() {
    let val = document.getElementById("weightInput").value;
    if (!val) return;

    let data = JSON.parse(localStorage.getItem("weights") || "[]");

    data.push({
        date: new Date().toLocaleDateString(),
        weight: val
    });

    localStorage.setItem("weights", JSON.stringify(data));

    document.getElementById("weightInput").value = "";
    loadWeight();
}

function loadWeight() {
    let data = JSON.parse(localStorage.getItem("weights") || "[]");

    let html = "";

    data.slice(-5).reverse().forEach(w => {
        html += `<div>${w.date} — ${w.weight} кг</div>`;
    });

    document.getElementById("weightHistory").innerHTML = html;
}

// CALENDAR
function drawCalendar() {

    let cal = document.getElementById("calendar");
    cal.innerHTML = "";

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    document.getElementById("monthTitle").innerText =
        months[month] + " " + year;

    let firstDay = new Date(year, month, 1).getDay();
    let days = new Date(year, month + 1, 0).getDate();

    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < firstDay; i++) {
        cal.appendChild(document.createElement("div"));
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

// DAY
function openDay(day) {

    let y = currentDate.getFullYear();
    let m = currentDate.getMonth() + 1;

    selectedDate = `${y}-${m}-${day}`;

    document.getElementById("dayTitle").innerText = selectedDate;

    let saved = localStorage.getItem("workout_" + selectedDate);
    document.getElementById("workoutInput").value = saved || "";

    switchScreen("dayScreen");
}

function saveWorkout() {
    let text = document.getElementById("workoutInput").value;
    if (!text) return;

    localStorage.setItem("workout_" + selectedDate, text);
    alert("Сохранено");
}

// INIT
switchScreen("main");
updateWater();
