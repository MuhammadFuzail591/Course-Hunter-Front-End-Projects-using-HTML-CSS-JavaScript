const toggleNav = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close");
const openBtn = document.getElementById("sign-up-btn");
const modal = document.getElementById("modal");
const page = document.getElementById("page");

toggleNav.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

openBtn.addEventListener("click", () => {
  modal.classList.add("show-modal");
});
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
window.addEventListener("click", (e) =>
  e.target !== toggleNav ? document.body.classList.remove("show-nav") : false
);
