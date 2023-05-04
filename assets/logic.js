var searchBox = document.querySelector("#searchBox");
var searchButton = document.querySelector("#searchButton");
var drinkResults = document.querySelector("#drinkResultContainer");
var drinkButton = document.querySelector("#drinkButton");
var iD = "";
var num = 1;
var COCKTAIL_API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

var FOOD_API_URL =
  "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
var FOOD_API_KEY = "&number=3&apiKey=57408b6aca4f4f4cad3cd0640c27fc9a";
var FOOD_API_SECOND_KEY = "&number=3&apiKey=0675a603136544f2bf5e7b291bfbca03";
var FOOD_API_THIRD_KEY = "&number=3&apiKey=43725fe05e144d5fa73ea28e7883f8d4";
var FOOD_API_FOURTH_KEY = "&number=3&apiKey=15ec0ec5c8574474b8ec01afd21ee36e";
var FOOD_API_SIXTH_KEY = "&number=3&apiKey=6559d12cdaa74ffba5026959f1cb3542";
var FOOD_API_SEVENTH_KEY = "&number=3&apiKey=beceeee4af7d4af581657cc0ea5b315c";
var FOOD_API_EIGHTH_KEY = "&number=3&apiKey=cea889c4c853419798c1319b12958949";
var FOOD_API_NINTH_KEY = "&number=3&apiKey=27994704f2c744118ed1e4d5c71bf4de";

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
  var drinkIngredientArray = [];

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
      drinkIngredientArray.push(newDrinkIngredient.textContent);
    }
  }

  var newDrinkInstructions = document.createElement("p");
  newDrinkInstructions.textContent = drinkInstructions;

  drinkResults.append(newIMG);
  drinkResults.append(newDrinkName);
  drinkResults.append(newDrinkIngredientList);
  drinkResults.append(newDrinkInstructions);

  var saveButton = document.createElement("button");
  saveButton.setAttribute("type", "submit");
  saveButton.textContent = "Save Drink";
  drinkResults.append(saveButton);

  saveButton.addEventListener("click", function () {
    var saveDrink = {
      saveIMG: drinkImg,
      saveName: drinkName,
      saveIngredients: drinkIngredientArray,
      saveInstructions: drinkInstructions,
    };

    var checkDrink = localStorage.getItem("checkDrink");
    if (checkDrink === null) {
      checkDrink = [];
    } else {
      checkDrink = JSON.parse(checkDrink);
    }
    checkDrink.push(saveDrink);
    var thisDrink = JSON.stringify(checkDrink);
    localStorage.setItem("checkDrink", thisDrink);

    // window.location.replace("./savedItems.html");
  });
}

//on click - fetches the data for search by ingredient and recipe information bases
function fetchFoodResults() {
  testing = searchBox.value;

  fetch(FOOD_API_URL + testing + FOOD_API_SECOND_KEY)
    .then(function (res) {
      if (!res.ok) throw new Error("oops got an error");
      return res.json();
    })
    .then(function (data) {
      for (var i = 0; i < 3; i++) {
        // console.log('SearchData :>>', data);
        var recipeTitle = document.getElementById("mealName-" + (i + 1));
        var recipePicture = document.getElementById("recipeImage-" + (i + 1));
        renderFoodResults(data[i], recipeTitle, recipePicture, i + 1);
      }
    });
}
//seperation of renderFoodResults, extraction of recipe id, name and image
function renderFoodResults(
  foodData,
  titleElement,
  imageElement,
  elementNumber
) {
  var iD = foodData.id;
  var recipeName = foodData.title;
  var recipeImage = foodData.image;

  titleElement.textContent = recipeName;
  imageElement.setAttribute("src", recipeImage);

  fetchRecipeDetails(iD, elementNumber); //initiates connection from search to recipe itself
  fetchIngredientList(iD, elementNumber);
}

//second fetch to grab the recipe details using extracted id
function fetchRecipeDetails(id, number) {
  fetch(
    "https://api.spoonacular.com/recipes/" +
      id +
      "/analyzedInstructions?" +

      FOOD_API_SECOND_KEY

  )
    .then(function (res) {
      if (!res.ok) throw new Error("oops got an error");
      return res.json();
    })
    .then(function (data) {
      recipeSteps = document.getElementById("recipeInstructions-" + number);
      renderRecipeDetails(data, recipeSteps);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function renderRecipeDetails(detailData, stepsElement) {
  for (var j = 0; j < detailData[0].steps.length; j++) {
    var steps = detailData[0].steps[j].step;
    var instructions = document.createElement("li");
    instructions.textContent = steps;
    stepsElement.append(instructions);
  }
}
function fetchIngredientList(id, number) {
  fetch(

    "https://api.spoonacular.com/recipes/" +
      id +
      "/information?" +
      FOOD_API_SECOND_KEY

  )
    .then(function (res) {
      if (!res.ok) throw new Error("oops got an error");
      return res.json();
    })
    .then(function (data) {
      ingredientList = document.getElementById("ingredientList-" + number);
      renderIngredientList(data, ingredientList);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function renderIngredientList(ingredientData, ingredientElement) {
  console.log(ingredientData);
  for (var i = 0; i < ingredientData.extendedIngredients.length; i++) {
    var allIngredients = ingredientData.extendedIngredients[i].original;
    var shoppingList = document.createElement("li");
    shoppingList.textContent = allIngredients;
    ingredientElement.append(shoppingList);
  }
}

searchButton.addEventListener("click", function () {
  var testing = searchBox.value;
  fetchFoodResults(); //initates food functions
});
