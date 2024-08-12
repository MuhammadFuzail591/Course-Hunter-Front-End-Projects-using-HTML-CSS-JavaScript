const currEl_one = document.getElementById("currency-one");
const amntEl_one = document.getElementById("amount-one");
const currEl_two = document.getElementById("currency-two");
const amntEl_two = document.getElementById("amount-two");
const swapEl_btn = document.getElementById("swap");
const rate_El = document.getElementById("rate");
CalcFunc();
//Event Listeners
currEl_one.addEventListener("change", CalcFunc);
amntEl_one.addEventListener("input", CalcFunc);
currEl_two.addEventListener("change", CalcFunc);
amntEl_two.addEventListener("input", CalcFunc);

function CalcFunc() {
  const currencyone = currEl_one.value;
  const currencytwo = currEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/7e209e79e6504da9ff18e085/latest/${currencyone}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rateOfCurr = data.conversion_rates[currencytwo];
      // console.log(rateOfCurr);

      rate_El.innerText = `1 ${currencyone} = ${rateOfCurr} ${currencytwo}`;

      amntEl_two.value = (amntEl_one.value * rateOfCurr).toFixed(4);
    });
}

swapEl_btn.addEventListener("click", () => {
  const tempVar = currEl_one.value;
  currEl_one.value = currEl_two.value;
  currEl_two.value = tempVar;
  CalcFunc();
});
