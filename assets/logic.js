var searchBox = document.querySelector('#searchBox');
var searchButton = document.querySelector('#searchButton');
var drinkResults = document.querySelector('#drinkResultContainer');
var drinkButton =document.querySelector('#drinkButton');
var iD = ""
var COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

var FOOD_API_URL = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
var FOOD_API_KEY = '&number=3&apiKey=57408b6aca4f4f4cad3cd0640c27fc9a';
var testing = searchBox.value;


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
    for (i=0; i<=drinkIngredients.length; i++) {
        if (drinkIngredients[i] != null) {
            var newDrinkIngredient = document.createElement('li');
            newDrinkIngredient.textContent = drinkIngredients[i];
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

//this function grabs the recipe Id, name and image
function fetchFoodResults() {
    fetch (FOOD_API_URL+testing+FOOD_API_KEY)
    .then(function (res) {
        if (!res.ok) throw new Error('oops got an error');
        return res.json();
    })
    .then(function (data) {
        console.log('data :>>', data);
        var iD = data[0].id;
        var recipeName = data[0].title
        var recipeImage = data[0].image
        console.log(iD);
        console.log(recipeName);
        console.log(recipeImage);
    })
    .catch(function (error) {
        console.error(error);
    });
}
fetch ('https://api.spoonacular.com/recipes/324694/analyzedInstructions?'+FOOD_API_KEY)
.then(function (res) {
    if (!res.ok) throw new Error('oops got an error');
    return res.json();
})
.then (function recipes(data){
    console.log("data :>>", data)
})
searchButton.addEventListener('click', function() {
    testing = searchBox.value;
    fetchFoodResults();
//add a fetchFoodResults function
})