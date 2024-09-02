const msgEl = document.getElementById("msg");
const numberBox = document.querySelector(".box");
let randomNumber = getRandomNumber();

console.log("Number", randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let speechrecog = new window.SpeechRecognition();

//Start Recognition

speechrecog.start();
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function checkCorrectness(msg) {
  let num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div class = "show">That is not a valid Number</div>`;
  } else {
    if (num < 1 || num > 100) {
      msgEl.innerHTML += `<div class = "show"> You Are Out of Range`;
    } else {
      if (num < randomNumber) {
        msgEl.innerHTML += `<div class = "show">Go Higher</div>`;
      } else if (num > randomNumber) {
        msgEl.innerHTML += `<div class = "show">Go Lower</div>`;
      } else {
        msgEl.innerHTML += `<div class = "show">Congrats..!! You Guessed Correct Number
          <br> It was ${num}
        </div>
          <button class="play-again" id="play-again" onclick ="clickFunc()">Play Again</button>

        `;
      }
    }
  }
}
function clickFunc() {
  window.location.reload();
}
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMsg(msg);
  checkCorrectness(msg);
}

function writeMsg(msg) {
  msgEl.innerHTML = `
   <div>You Said:</div>
   <span class="box">${msg}</span>
  `;
}
//Event listeners
speechrecog.addEventListener("result", onSpeak);
speechrecog.addEventListener("error", (e) => {
  console.log(e.error);
});
speechrecog.addEventListener("end", () => speechrecog.start());
