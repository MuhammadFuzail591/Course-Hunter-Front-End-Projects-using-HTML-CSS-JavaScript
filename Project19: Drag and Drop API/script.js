const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

let listItems = [];

let dragStartIndex = 0;

let richestPeople = [
  "Jeff Bezos",
  "Bil Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Anamcio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable = "true">
        <p class="person-name">${person}</p>
        <i class="ri-drag-move-line"></i>
        </div>
    `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".draggable").innerText.trim();
    if (personName !== richestPeople[index]) {
      item.classList.add("wrong");
    } else {
      item.classList.add("right");
      item.classList.remove("wrong");
    }
  });
  checkOrder();
}

function dragStart() {
  dragStartIndex = this.closest("li").getAttribute("data-index");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragDropIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragDropIndex);
  this.classList.remove("over");
}

function swapItems(fromInd, toInd) {
  const itemOne = listItems[fromInd].querySelector(".draggable");
  const itemTwo = listItems[toInd].querySelector(".draggable");

  listItems[fromInd].appendChild(itemTwo);
  listItems[toInd].appendChild(itemOne);
}
function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragItemsList = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragItemsList.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

checkBtn.addEventListener("click", checkOrder);

createList();
