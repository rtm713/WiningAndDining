var searchBox = document.querySelector('#searchBox');
var searchButton = document.querySelector('#searchButton');
var drinkResults = document.querySelector('#drinkResultContainer');
var drinkButton =document.querySelector('#drinkButton');

var COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

var FOOD_API_URL = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
var FOOD_API_KEY = '&number=3&apiKey=57408b6aca4f4f4cad3cd0640c27fc9a';
var testing = "";

searchButton.addEventListener('click', function() {
    testing = searchBox.value;
    fetchFoodResults();
//add a fetchFoodResults function
})

drinkButton.addEventListener('click', function() {
    fetchDrinkResults();
})


function fetchDrinkResults() {
    fetch (COCKTAIL_API_URL)
    .then(function (res) {
        if (!res.ok) throw new Error('oops got an error');
        return res.json();
    })
    .then(function (data) {
        console.log('Data :>>', data);
        renderDrinkResults(data.drinks[0]);
    })
    .catch(function (error) {
        console.error(error);
    });
}

function fetchFoodResults() {
    fetch (FOOD_API_URL+testing+FOOD_API_KEY)
    .then(function (res) {
        if (!res.ok) throw new Error('oops got an error');
        return res.json();
    })
    .then(function (data) {
        console.log('data :>>', data);
        // renderDrinkResults(data.drinks[0]);
    })
    .catch(function (error) {
        console.error(error);
    });
}


// Create renderFoodResults Function


function renderDrinkResults(DrinkData) {
    drinkResults.textContent="";
    var drinkName = DrinkData.strDrink;
    var drinkIngredients = [DrinkData.strMeasure1+" "+DrinkData.strIngredient1,DrinkData.strMeasure2+" "+DrinkData.strIngredient2,DrinkData.strMeasure3+" "+DrinkData.strIngredient3,
    DrinkData.strMeasure4+" "+DrinkData.strIngredient4, DrinkData.strMeasure5+" "+DrinkData.strIngredient5, DrinkData.strMeasure6+" "+DrinkData.strIngredient6,];

    var drinkImg = DrinkData.strDrinkThumb;
    var drinkInstructions = DrinkData.strInstructions;


    var newIMG = document.createElement('img');
    newIMG.setAttribute('src',drinkImg);

    var newDrinkName = document.createElement('h4');
    newDrinkName.textContent = drinkName;

    var newDrinkIngredientList = document.createElement('ul');

    for (var i=1;i<=15;i++) {
        var ingredientPropertyName = "strIngredient";
        var measurePropertyName = "strMeasure";
        ingredientPropertyName += i;
        measurePropertyName += i;

        var ingredient = DrinkData[ingredientPropertyName];
        if (ingredient) {
            var newDrinkIngredient = document.createElement('li');
            newDrinkIngredient.textContent = DrinkData[measurePropertyName] + " " + ingredient;
            newDrinkIngredientList.append(newDrinkIngredient); 
        }

    }

    var newDrinkInstructions = document.createElement('p');
    newDrinkInstructions.textContent = drinkInstructions;

    drinkResults.append(newIMG);
    drinkResults.append(newDrinkName);
    drinkResults.append(newDrinkIngredientList);
    drinkResults.append(newDrinkInstructions);



}