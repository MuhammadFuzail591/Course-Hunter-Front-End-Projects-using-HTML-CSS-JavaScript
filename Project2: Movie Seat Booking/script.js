const seatContainer = document.querySelector(".seats-container");
const seatCount = document.getElementById("count");
const totalAmount = document.getElementById("amount");
const allSeats = document.querySelectorAll(".seat");
const movieSelect = document.getElementById("movie-list");

defaultFunctionality();
let ticketPrice = +movieSelect.value;

function updateCount() {
  const selectedSts = document.querySelectorAll(".row .seat.selected");

  const selectedStsCount = selectedSts.length;

  const selectedSeatsIndex = [...selectedSts].map((seat) =>
    [...allSeats].indexOf(seat)
  );

  // console.log("Muhammad Fuzal");
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndex));

  seatCount.innerText = selectedStsCount;
  totalAmount.innerText = selectedStsCount * ticketPrice;
}

function setMovieData(mIndex, mPrice) {
  localStorage.setItem("MovieIndex", mIndex);
  localStorage.setItem("MoviePrice", mPrice);
}

function defaultFunctionality() {
  const selectedSts = JSON.parse(localStorage.getItem("selectedSeats"));
  // console.log(selectedSts);
  if (selectedSts !== null && selectedSts.length > 0) {
    allSeats.forEach((seat, index) => {
      if (selectedSts.indexOf(index) > -1) {
        seat.classList.add("selected");
        // console.log("Muhammad Fuzail");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("movieIndex");
  const selectedMoviePrice = localStorage.getItem("moviePrice");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedMovieIndex = selectedMovieIndex;
  }
}
seatContainer.addEventListener("click", (obj) => {
  // console.log("Hum Ki kariye");
  if (
    obj.target.classList.contains("seat") &&
    !obj.target.classList.contains("occupied")
  ) {
    obj.target.classList.toggle("selected");
  }

  updateCount();
});

movieSelect.addEventListener("change", (ob) => {
  // console.log("Muhammad Fuzail add event");
  ticketPrice = ob.target.value;
  updateCount();
  setMovieData(ob.target.selectedSeatsIndex, ob.target.value);

  // defaultFunctionality();
});
updateCount();
