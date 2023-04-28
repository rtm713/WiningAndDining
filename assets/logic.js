var searchBox = document.querySelector('#searchBox');
var searchButton = document.querySelector('#searchButton');
var drinkResults = document.querySelector('#drinkResultContainer');

var COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

var FOOD_API_URL = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
var FOOD_API_KEY = '&number=3&apiKey=57408b6aca4f4f4cad3cd0640c27fc9a';
var testing = "";

searchButton.addEventListener('click', function() {
    testing = searchBox.value;
    fetchDrinkResults();
    fetchFoodResults();
//add a fetchFoodResults function
})

// Create a fetchFoodResults function
   //  include renderFoodResults function


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

    // for (i=0; i<=drinkIngredients.length; i++) {
    //     if

    //     //make into a list????
    // var newDrinkIngredients = document.createElement('p');
    // newDrinkIngredients.textContent = drinkIngredients;

    // }



    //NEED TO LOOP THROUGH INGREDIENTS?? MORE THAN THREE????
    // need to add amounts strMeasure1 + ingredient???
    // BUG: returns 0 when there is no item (only has 2 ingred.)




    var drinkImg = DrinkData.strDrinkThumb;
    var drinkInstructions = DrinkData.strInstructions;


    var newIMG = document.createElement('img');
    newIMG.setAttribute('src',drinkImg);

    var newDrinkName = document.createElement('h4');
    newDrinkName.textContent = drinkName;

    var newDrinkInstructions = document.createElement('p');
    newDrinkInstructions.textContent = drinkInstructions;

    drinkResults.append(newIMG);
    drinkResults.append(newDrinkName);
    drinkResults.append(newDrinkIngredients);
    drinkResults.append(newDrinkInstructions);



}