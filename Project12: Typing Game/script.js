const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const selectDifficulty = document.getElementById("difficulty");
const word = document.getElementById("word");
const value = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const endGameCont = document.getElementById("end-game-container");

let randomWord;

let score = 0;

let time = 10;

let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

selectDifficulty.value = difficulty;
//Start counting down
const timeInterval = setInterval(updateTime, 1000);
//Move Cursor to input on reload
value.focus();
//Function to Fetch Random number
async function getRandomWord() {
  try {
    const response = await fetch(
      "https://random-word-api.vercel.app/api?words=1"
    );
    const data = await response.json(); // Wait for the response and parse it as JSON
    return data[0]; // Return the data
  } catch (error) {
    console.error("Error fetching data:", error); // Handle errors
  }
}
async function addWordToDOM() {
  randomWord = await getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

function updateTime() {
  // console.log(1);
  time--;
  timeEl.innerText = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endGameCont.innerHTML = `
    <h1>Time Ran Out</h1>
    <p>Score: <span>Your final Socre is ${score}</span></p>
    <button onclick="location.reload()">Play Again</button>
  `;
  endGameCont.style.display = "flex";
}
addWordToDOM();

//Event Listeners

value.addEventListener("input", (e) => {
  const term = e.target.value;

  if (term === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 5;
    } else {
      time += 8;
    }

    updateTime();
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

console.log(difficulty);
