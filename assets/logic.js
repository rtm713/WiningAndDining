var searchBox = document.querySelector('#searchBox');
var searchButton = document.querySelector('#searchButton');
var drinkResults = document.querySelector('#drinkResultContainer');

var COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
// ADD Tasty API URL

searchButton.addEventListener('click', function() {
    fetchDrinkResults();
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
        console.log('data :>>', data);
        renderDrinkResults(data.drinks[0]);
    })
    .catch(function (error) {
        console.error(error);
    });
}


// Create renderFoodResults Function

function renderDrinkResults(DrinkData) {
    drinkResults.textContent="";
    var drinkName = DrinkData.strDrink;
    var drinkIngredients = [DrinkData.strMeasure1 + DrinkData.strIngredient1, DrinkData.strMeasure2 + DrinkData.strIngredient2, DrinkData.strMeasure3 + DrinkData.strIngredient3];
    //NEED TO LOOP THROUGH INGREDIENTS?? MORE THAN THREE????
    // need to add amounts strMeasure1 + ingredient???
    // BUG: returns 0 when there is no item (only has 2 ingred.)

    var drinkImg = DrinkData.strDrinkThumb;
    var drinkInstructions = DrinkData.strInstructions;


    var newIMG = document.createElement('img');
    newIMG.setAttribute('src',drinkImg);

    var newDrinkName = document.createElement('h4');
    newDrinkName.textContent = drinkName;

    //make into a list????
    var newDrinkIngredients = document.createElement('p');
    newDrinkIngredients.textContent = drinkIngredients;

    var newDrinkInstructions = document.createElement('p');
    newDrinkInstructions.textContent = drinkInstructions;

    drinkResults.append(newIMG);
    drinkResults.append(newDrinkName);
    drinkResults.append(newDrinkIngredients);
    drinkResults.append(newDrinkInstructions);



}