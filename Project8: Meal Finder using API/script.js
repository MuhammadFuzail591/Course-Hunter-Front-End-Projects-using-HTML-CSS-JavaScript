const searchBtn = document.getElementById("search"),
  submit = document.getElementById("submit"),
  randomBtn = document.getElementById("random"),
  mealsEl = document.getElementById("mealsid"),
  resultHeading = document.getElementById("result-heading"),
  singleMealEl = document.getElementById("single-meal"),
  smallTag = document.getElementById("small-tag");

function isValidName(name) {
  // Only alphabetic characters, at least 3 characters long, and no character repeated more than three times consecutively
  const regex = /^(?!.*([a-zA-Z])\1{2})[a-zA-Z]{3,}$/;
  return regex.test(name);
}

function searchMeal(e) {
  e.preventDefault();

  //Clear Single Meal
  singleMealEl.innerHTML = "";

  //Get Search term
  const term = searchBtn.value;

  //Checking if it is not empty

  if (term.trim()) {
    if (!isValidName(term.trim())) {
      smallTag.innerText = "Not looking Correct Meal Name...!!";
      smallTag.style.display = "block";
      setTimeout(() => {
        smallTag.style.display = "none";
      }, 2000);
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok " + res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

          if (data.meals === null) {
            resultHeading.innerHTML = `<h2>Sorry...!! There are no search results. Try Again..</h2>`;
          } else {
            mealsEl.innerHTML = data.meals
              .map(
                (meal) => `
            <div class="mealcl">
              <img src="${meal.strMealThumb}" alt = "${meal.strMeal}"/>
              <div class="meal-info" data-mealID = "${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
              `
              )
              .join("");
          }
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
    searchBtn.value = "";
  } else {
    smallTag.style.display = "block";

    setTimeout(() => {
      smallTag.style.display = "none";
    }, 2000);
    // console.log("Input main kuch ni");
  }
}

//Event Listeners

submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    // if (item.classList) {
    //   return item.classList.contains("meal-info");
    // } else {
    //   return false;
    // }
    console.log(item);
  });

  // console.log(mealInfo);
});
