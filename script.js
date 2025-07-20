window.addEventListener("DOMContentLoaded", function() {
    const savedReflections = JSON.parse(localStorage.getItem("reflections")) || [];

savedReflections.forEach(entry => {
  const reflectionItem = document.createElement("div");
  reflectionItem.classList.add("reflection-entry");
  reflectionItem.innerHTML = `<p>${entry.text}</p><small>${entry.timestamp}</small>`;
  document.getElementById("reflection-list").appendChild(reflectionItem);
});

const now = new Date();
console.log(now);

const countdownDate = new Date("July30,2025 18:00:00");
console.log (countdownDate);

const difference = countdownDate - now;

// Calculate time units
const days = Math.floor(difference / (1000 * 60 * 60 * 24));
const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
console.log(days, hours, minutes);

document.getElementById("days").textContent = days;
document.getElementById("hours").textContent = hours;
document.getElementById("minutes").textContent = minutes;

function updateCountdown() {
  const now = new Date();
  const countdownDate = new Date("July 30, 2025 18:00:00");
  const difference = countdownDate - now;

}

setInterval(updateCountdown, 1000);

document.getElementById("submit-reflection").addEventListener("click", function() {
const reflectionText = document.getElementById("reflection").value;

  // Prevent empty reflections
  if (reflectionText.trim() === "") return;

  const timestamp = new Date().toLocaleString();

  const reflectionItem = document.createElement("div");
  reflectionItem.classList.add("reflection-entry");
  reflectionItem.innerHTML = `<p>${reflectionText}</p><small>${timestamp}</small>`;

  document.getElementById("reflection-list").appendChild(reflectionItem);

    // Save to localStorage
  let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
  reflections.push({ text: reflectionText, timestamp });
  localStorage.setItem("reflections", JSON.stringify(reflections));

  // Clear the text area
  document.getElementById("reflection").value = "";
});
});