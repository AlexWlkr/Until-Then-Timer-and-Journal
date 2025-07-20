window.addEventListener("DOMContentLoaded", function () {
  // Load reflections from localStorage
  const savedReflections = JSON.parse(localStorage.getItem("reflections")) || [];
  savedReflections.forEach(entry => {
    const reflectionItem = document.createElement("div");
    reflectionItem.classList.add("reflection-entry");
    reflectionItem.innerHTML = `<p>${entry.text}</p><small>${entry.timestamp}</small>`;
    document.getElementById("reflection-list").appendChild(reflectionItem);
  });

  // Load stored countdown target date
  let countdownDate = localStorage.getItem("countdownDate");
  if (countdownDate) {
    countdownDate = new Date(countdownDate);
  } else {
    countdownDate = new Date("July 30, 2025 18:00:00"); // fallback default
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
  updateCountdown();
  setInterval(updateCountdown, 1000);

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
});
