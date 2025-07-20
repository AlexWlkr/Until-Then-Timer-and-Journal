window.addEventListener("DOMContentLoaded", function () {
   let countdownInterval;

  // Load reflections from localStorage
  const savedReflections = JSON.parse(localStorage.getItem("reflections")) || [];
  savedReflections.forEach(entry => {
    const reflectionItem = document.createElement("div");
    reflectionItem.classList.add("reflection-entry");
    reflectionItem.innerHTML = `<p>${entry.text}</p><small>${entry.timestamp}</small>`;
    document.getElementById("reflection-list").appendChild(reflectionItem);
  });

  // and validate saved countdown date from localStorage
let countdownDate = null;
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
if (countdownDate) {
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
    updateCountdown();
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
