const wordEl = document.getElementById("word");
const wrongLetters = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-btn");
const notification = document.getElementById("notification-container");
const popup = document.getElementById("popup-container");
const finalMsg = document.getElementById("final-msg");

const figureParts = document.querySelectorAll(".figure-part");
const words = ["website", "program", "mobile", "object", "loops"];
const selectedWord = words[Math.floor(Math.random() * words.length)];

const corrWords = [];
const wrongWords = [];

function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">
            ${corrWords.includes(letter) ? letter : ""}     
        </span>`
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMsg.innerText = "Congratulations? You Won";
    popup.style.display = "flex";
  }
}

function showNotificationFunc() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
  // console.log("show Notification Func");
}
function showWrongFunc() {
  wrongLetters.innerHTML = `
  ${wrongWords.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongWords.map((letter) => `<span>${letter}</span>`)}`;

  figureParts.forEach((item, index) => {
    const errors = wrongWords.length;

    if (index < errors) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  if (wrongWords.length === figureParts.length) {
    finalMsg.innerText = "Unfortunately You Lost..!!";

    popup.style.display = "flex";
  }
}

playAgainBtn.addEventListener("click", () => {
  location.reload();
});

window.addEventListener("keydown", (e) => {
  const letter = e.key;

  if (letter.length === 1 && letter.match(/[a-zA-Z]/)) {
    if (selectedWord.includes(letter)) {
      if (!corrWords.includes(letter)) {
        corrWords.push(letter);
        displayWord();
      } else {
        showNotificationFunc();
      }
    } else {
      if (!wrongWords.includes(letter)) {
        wrongWords.push(letter);

        showWrongFunc();
      } else {
        showNotificationFunc();
      }
    }
  }
});

displayWord();
