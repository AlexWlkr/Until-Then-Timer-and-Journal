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

  // do the math for days/hours/minutes again
  // update the DOM again
}

setInterval(updateCountdown, 1000);