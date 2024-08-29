const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");
const selectVoice = document.getElementById("voices");
const text = document.getElementById("text-box");
const readBtn = document.getElementById("read");
const mainEl = document.querySelector("main");
const textArea = document.getElementById("text");
const box = document.querySelector(".box");

let voices = [];

const data = [
  {
    image: "./Images/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./Images/drink.jpg",
    text: "I want to drink Water",
  },
  {
    image: "./Images/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./Images/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./Images/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./Images/sad.jpg",
    text: "I'm so Sad",
  },
  {
    image: "./Images/hurt.jpg",
    text: "I'm Hurted",
  },
  {
    image: "./Images/tired.jpg",
    text: "I'm very Tired",
  },
  {
    image: "./Images/home.jpg",
    text: "I want to go Home",
  },
  {
    image: "./Images/grandma.jpg",
    text: "I want to go to Grandma",
  },
  {
    image: "./Images/school.jpg",
    text: "I want to go to school",
  },
  {
    image: "./Images/outside.jpg",
    text: "I want to go Outside",
  },
];

data.forEach(createBox);

//Create Box in the DOM
function createBox(item) {
  const box = document.createElement("div");
  box.classList.add("box");
  const { image, text } = item;
  box.innerHTML = `
    <img class="box-img" src="${image}" alt="${text}"/>
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakTest();
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 800);
  });

  mainEl.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

function getVoice() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    selectVoice.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}
function speakTest() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

speechSynthesis.addEventListener("voiceschanged", getVoice);
toggleBtn.addEventListener("click", () => {
  text.classList.toggle("show");

  // text.style.transform = "translate(-50%,0%)";
});

closeBtn.addEventListener("click", () => {
  text.classList.remove("show");
  //text.style.transform = "translate(-50%,-220%)";
});

readBtn.addEventListener("click", () => {
  const arText = textArea.value;
  setTextMessage(arText);
  speakTest();
});
selectVoice.addEventListener("change", setVoice);
getVoice();
