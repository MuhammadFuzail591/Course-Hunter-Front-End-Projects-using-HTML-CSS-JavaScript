const balanceEl = document.getElementById("balance"),
  moneyPlus = document.getElementById("money-plus"),
  moneyMinus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  textInput = document.getElementById("text"),
  amountInput = document.getElementById("amount"),
  errorShow = document.getElementById("error");

// let transactionsDummy = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Camera", amount: -20 },
//   { id: 4, text: "Book", amount: 200 },
// ];
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();

  if (textInput.value === "" || amountInput.value === "") {
    showAlert("Both");
  } else if (textInput.value === "") {
    showAlert("Text");
  } else if (amountInput.value === "") {
    showAlert("Amount");
  } else {
    const transaction = {
      id: generateID(),
      text: textInput.value,
      amount: +amountInput.value,
    };

    transactions.push(transaction);
    console.table(transactions);
    addTransToDOM(transaction);
    updateValues(transaction);
    updateLocalStorage();
    textInput.value = "";
    amountInput.value = "";
  }
}
function showAlert(input) {
  errorShow.innerText = `${input} Field(s) is Empty..!!`;
  errorShow.style.display = "block";

  setTimeout(() => {
    errorShow.style.display = "none";
  }, 2000);
}
function generateID() {
  return Math.floor(Math.random() * 1000);
}
function updateValues() {
  const amounts = transactions.map((item) => item.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  balanceEl.innerText = `${total}PKR`;
  moneyPlus.innerText = `${income}PKR`;
  moneyMinus.innerText = `${expense}PKR`;
}

function addTransToDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" title="Delete Transaction" onclick="deleteTransaction(${
    transaction.id
  })"><i class="ri-close-large-line"></i></button></li>
  `;
  list.appendChild(item);
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransToDOM);
  updateValues();
}
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", addTransaction);
init();
