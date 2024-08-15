const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionaireBtn = document.getElementById("show-millionaire");
const sortBtn = document.getElementById("sort");
const calcWealthBtn = document.getElementById("calc-wealth");

let data = [];

function addData(obj) {
  data.push(obj);

  updateDOM();
}

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");

  const Ndata = await res.json();
  const user = Ndata.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  //   console.table(newUser);
  // console.table(newUser);
  addData(newUser);
}

function doubleMoney(obj) {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillionaire() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });

  updateDOM();
}

function calcWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const moneyElement = document.createElement("div");
  moneyElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(moneyElement);
}
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(nmb) {
  return nmb.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + " PKR";
}

addUserBtn.addEventListener("click", getRandomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionaireBtn.addEventListener("click", showMillionaire);
calcWealthBtn.addEventListener("click", calcWealth);
