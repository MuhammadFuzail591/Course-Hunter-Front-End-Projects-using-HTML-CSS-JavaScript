const text = document.getElementById("text");
const container = document.getElementById("container");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

console.log(breatheTime);
console.log(holdTime);

breathAnimtion();
function breathAnimtion() {
  text.innerText = "Breathe In...!!!";
  container.className = "container grow";
  setTimeout(() => {
    text.innerText = "hold..!!";

    setTimeout(() => {
      text.innerText = "Breathe Out...!!";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimtion, totalTime);
