window.addEventListener("DOMContentLoaded", function () {
   let countdownInterval;
   let countdownDate = null;
  let hasCelebrated = false; 

 //alarm helpers
function playAlarm() {
  const alarmEl = document.getElementById("alarm");
  if (!alarmEl) {
    console.warn("No <audio id='alarm'> element found.");
    return;
  }
  alarmEl.muted = false;      // ensure not muted
  alarmEl.volume = 1;         // ensure audible (adjust if needed)
  alarmEl.currentTime = 0;

  const p = alarmEl.play();
  if (p && typeof p.catch === "function") {
    p.catch(err => console.warn("Alarm play() blocked or failed:", err));
  }
}

 //prime audio on user gesture
function primeAlarmAudio() {
const alarmEl = document.getElementById("alarm");

   // Try to load metadata
  alarmEl.load();

  // Near-silent blip for ~100ms, then pause
 const prevVol = alarmEl.volume ?? 1;
const prevMuted = alarmEl.muted ?? false;
 alarmEl.currentTime = 0;
alarmEl.volume = 1;           // volume doesn't matter while muted
alarmEl.muted = true;         // <— guarantee silence
alarmEl.play().then(() => {
   setTimeout(() => {
     alarmEl.pause();
     alarmEl.currentTime = 0;
     alarmEl.muted = prevMuted;   // restore original muted state
     alarmEl.volume = prevVol;    // restore volume
   }, 120);
 }).catch(() => {});
}

  // Load reflections from localStorage
  const savedReflections = JSON.parse(localStorage.getItem("reflections")) || [];
  savedReflections.forEach(entry => {
    const reflectionItem = document.createElement("div");
    reflectionItem.classList.add("reflection-entry");
    reflectionItem.innerHTML = `<p>${entry.text}</p><small>${entry.timestamp}</small>`;
    document.getElementById("reflection-list").appendChild(reflectionItem);
  });

  // and validate saved countdown date from localStorage
const storedDate = localStorage.getItem("countdownDate");

if (storedDate) {
  const parsedDate = new Date(storedDate);
  if (!isNaN(parsedDate.getTime())) {
    countdownDate = parsedDate;
  }
}

  // Countdown update function
  function updateCountdown() {
    const now = new Date();
    const difference = countdownDate - now;

    if (difference <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      clearInterval(countdownInterval);        
      if (!hasCelebrated) {                    
        hasCelebrated = true;                  
        playAlarm();                          
      }
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  }

  // Start the countdown loop
if (countdownDate && countdownDate - new Date() > 0) {
  hasCelebrated = false;
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

  // Reflection submit
  document.getElementById("submit-reflection").addEventListener("click", function () {
    const reflectionText = document.getElementById("reflection").value;
    if (reflectionText.trim() === "") return;

    const timestamp = new Date().toLocaleString();
    const reflectionItem = document.createElement("div");
    reflectionItem.classList.add("reflection-entry");
    reflectionItem.innerHTML = `<p>${reflectionText}</p><small>${timestamp}</small>`;
    document.getElementById("reflection-list").appendChild(reflectionItem);

    let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
    reflections.push({ text: reflectionText, timestamp });
    localStorage.setItem("reflections", JSON.stringify(reflections));
    document.getElementById("reflection").value = "";
  });

  // Timer setter
  document.getElementById("set-countdown").addEventListener("click", function () {
    const userDate = document.getElementById("countdown-input").value;
    if (!userDate) return;

    countdownDate = new Date(userDate);
    localStorage.setItem("countdownDate", countdownDate.toString());
    //reset state and interval
    hasCelebrated = false;
    clearInterval(countdownInterval);

    //prime audio on user gesture
    primeAlarmAudio();
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  });

  // Clear timer and reflections
document.getElementById("clear-timer").addEventListener("click", function () {
  // Clear all saved data
  localStorage.clear();

  // Stop the countdown timer from running
  clearInterval(countdownInterval);

  // Set countdownDate to null to stop updateCountdown() from running
  countdownDate = null;

  // Reset the timer display to 00
  document.getElementById("days").textContent = "00";
  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";

  // Clear reflections and input box
  document.getElementById("reflection-list").innerHTML = "";
  document.getElementById("reflection").value = "";

  //  Clear the date input field
  const dateInput = document.getElementById("countdown-input");
  if (dateInput) {
    dateInput.value = "";
  }
});

});
