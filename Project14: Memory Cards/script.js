const clearBtn = document.getElementById("clear"),
  showCardBtn = document.getElementById("show"),
  cardsContainer = document.getElementById("cards"),
  prevBtn = document.getElementById("prev"),
  currentEl = document.getElementById("current"),
  nextBtn = document.getElementById("next"),
  addContainer = document.getElementById("add-container"),
  hideBtn = document.getElementById("hide"),
  questionTextArea = document.getElementById("question"),
  answerTextArea = document.getElementById("answer"),
  addCardBtn = document.getElementById("add-card");

let currentCard = 0;

//Store DOM Cards
const cardsEl = [];

//Store card data
const cardsData = getCardsData();

//Create All Cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
        <div class="inner-card">
                <div class="inner-card-front">
                    <p>${data.question}</p>
                </div>
                <div class="inner-card-back">
                    <p>${data.answer}</p>
                </div>
            </div>
    `;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  //   currentEl.innerText = `${index}/${cardsEl.length}`;
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}
function updateCurrentText() {
  currentEl.innerText = `${currentCard + 1}/${cardsEl.length}`;
}

function addCard() {
  const question = questionTextArea.value;
  const answer = answerTextArea.value;

  if (question.trim() && answer.trim()) {
    const newCard = {
      question: question,
      answer: answer,
    };
    createCard(newCard);
    question.value = "";
    answer.value = "";
    addContainer.classList.remove("show");
    cardsData.push(newCard);

    setCardData(cardsData);
    createCards();
  }
}

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}
function setCardData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}
createCards();

//Event Listeners
nextBtn.addEventListener("click", () => {
  cardsEl[currentCard].className = "card left";
  currentCard = currentCard + 1;
  if (currentCard > cardsEl.length - 1) {
    currentCard = cardsEl.length - 1;
  }
  updateCurrentText();
  cardsEl[currentCard].className = "card active";
});
prevBtn.addEventListener("click", () => {
  cardsEl[currentCard].className = "card right";
  currentCard = currentCard - 1;
  if (currentCard < 0) {
    currentCard = 0;
  }
  updateCurrentText();
  cardsEl[currentCard].className = "card active";
});

showCardBtn.addEventListener("click", () => {
  console.log("I am working");
  addContainer.classList.add("show");
});
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));
addCardBtn.addEventListener("click", addCard);
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
