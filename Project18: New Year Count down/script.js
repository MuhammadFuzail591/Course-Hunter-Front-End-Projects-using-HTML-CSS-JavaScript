const yearbold = document.getElementById("year");
const countDown = document.getElementById("countdown");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const gifImage = document.getElementById("loading");
const loading = document.getElementById("loading");
const currYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currYear + 1} 00:00:00`);

function updateCountDown() {
  const currTime = new Date();
  const diff = newYearTime - currTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  yearbold.innerText = `${currYear + 1}`;
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
  seconds.innerHTML = s < 10 ? "0" + s : s;
}
setTimeout(() => {
  loading.remove();
  countDown.style.display = "flex";
}, 1000);
setInterval(updateCountDown, 1000);

// console.log(currYear, newYearTime);
