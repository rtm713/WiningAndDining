var searchBox = document.querySelector("#searchBox");
var searchButton = document.querySelector("#searchButton");
var drinkResults = document.querySelector("#drinkResultContainer");
var drinkButton = document.querySelector("#drinkButton");
var iD = "";

var COCKTAIL_API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

var FOOD_API_URL =
  "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
var FOOD_API_KEY = "&number=3&apiKey=57408b6aca4f4f4cad3cd0640c27fc9a";
var FOOD_API_SECOND_KEY = "&number=3&apiKey=0675a603136544f2bf5e7b291bfbca03";
var FOOD_API_THIRD_KEY = "&number=3&apiKey=43725fe05e144d5fa73ea28e7883f8d4";
var FOOD_API_FOURTH_KEY = "&number=3&apiKey=15ec0ec5c8574474b8ec01afd21ee36e";

drinkButton.addEventListener("click", function () {
  fetchDrinkResults();
});

function fetchDrinkResults() {
  fetch(COCKTAIL_API_URL)
    .then(function (res) {
      if (!res.ok) throw new Error("oops got an error");
      return res.json();
    })
    .then(function (data) {
      console.log("Data :>>", data);
      renderDrinkResults(data.drinks[0]);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function renderDrinkResults(DrinkData) {
  drinkResults.textContent = "";
  var drinkName = DrinkData.strDrink;

  var drinkImg = DrinkData.strDrinkThumb;
  var drinkInstructions = DrinkData.strInstructions;

  var newIMG = document.createElement("img");

  newIMG.setAttribute("src", drinkImg);

  var newDrinkName = document.createElement("h4");
  newDrinkName.textContent = drinkName;

  var newDrinkIngredientList = document.createElement("ul");

  for (var i = 1; i <= 15; i++) {
    var ingredientPropertyName = "strIngredient";
    var measurePropertyName = "strMeasure";
    ingredientPropertyName += i;
    measurePropertyName += i;

    var ingredient = DrinkData[ingredientPropertyName];
    if (ingredient) {
      var newDrinkIngredient = document.createElement("li");
      newDrinkIngredient.textContent =
        DrinkData[measurePropertyName] + " " + ingredient;
      newDrinkIngredientList.append(newDrinkIngredient);
    }
  }

  var newDrinkInstructions = document.createElement("p");
  newDrinkInstructions.textContent = drinkInstructions;

  drinkResults.append(newIMG);
  drinkResults.append(newDrinkName);
  drinkResults.append(newDrinkIngredientList);
  drinkResults.append(newDrinkInstructions);
}

//on click - fetches the data for search by ingredient and recipe information bases
function fetchFoodResults() {
  testing = searchBox.value;
  fetch(FOOD_API_URL + testing + FOOD_API_FOURTH_KEY)
    .then(function (res) {
      if (!res.ok) throw new Error("oops got an error");
      return res.json();
    })
    .then(function (data) {
      for (var i = 0; i < 3; i++) {
        // console.log('SearchData :>>', data);
        var recipeTitle = document.getElementById("mealName-" + (i + 1));
        var recipePicture = document.getElementById("recipeImage-" + (i + 1));
        renderFoodResults(data[i], recipeTitle, recipePicture);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
//seperation of renderFoodResults, extraction of recipe id, name and image
function renderFoodResults(foodData, titleElement, imageElement) {
  var iD = foodData.id;
  var recipeName = foodData.title;
  var recipeImage = foodData.image;

  titleElement.textContent = recipeName;
  imageElement.setAttribute("src", recipeImage);

  fetchRecipeDetails(iD); //initiates connection from search to recipe itself
  fetchIngredientList(iD);
}

//second fetch to grab the recipe details using extracted id
function fetchRecipeDetails(id) {
  fetch(
    "https://api.spoonacular.com/recipes/" +
      id +
      "/analyzedInstructions?" +
      FOOD_API_FOURTH_KEY
  )
    .then(function (res) {
      if (!res.ok) throw new Error("oops got an error");
      return res.json();
    })
    .then(function (data) {
      console.log(id);
      //    console.log("DetailData :>>", data);
      renderRecipeDetails(data);
    });
}
function renderRecipeDetails(detailData) {
  // console.log(detailData)

  for (var i = 0; i < detailData[0].steps.length; i++) {
    var instructions = detailData[0].steps[i].step;
    console.log(instructions);
  }
}
function fetchIngredientList(id) {
  fetch(
    "https://api.spoonacular.com/recipes/" +
      id +
      "/information?" +
      FOOD_API_FOURTH_KEY
  )
    .then(function (res) {
      if (!res.ok) throw new Error("oops got an error");
      return res.json();
    })
    .then(function (data) {
      //     console.log(id);
      //     console.log("fetch ingredients working");
      //    console.log("IngredientData :>>", data);
      renderIngredientList(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function renderIngredientList(ingredientData) {
  for (i = 0; i < ingredientData.extendedIngredients.length; i++) {
    var instructions = ingredientData.extendedIngredients[i].original;
    console.log(instructions);
  }
}

searchButton.addEventListener("click", function () {
  var testing = searchBox.value;
  fetchFoodResults(); //initates food functions
});
