var searchBox = document.querySelector('#searchBox');
var searchButton = document.querySelector('#searchButton');
var drinkResults = document.querySelector('#drinkResultContainer');
var drinkButton =document.querySelector('#drinkButton');
var iD = ""
var COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

var FOOD_API_URL = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
var FOOD_API_KEY = '&number=1&apiKey=57408b6aca4f4f4cad3cd0640c27fc9a';
var FOOD_API_SECOND_KEY = '&number=2&apiKey=0675a603136544f2bf5e7b291bfbca03';
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

//on click - fetches the data for search by ingredient and recipe information bases
function fetchFoodResults() {
    fetch (FOOD_API_URL+testing+FOOD_API_SECOND_KEY)
    .then(function (res) {
        if (!res.ok) throw new Error('oops got an error');
        return res.json();
    })
    .then(function (data) {
        for (i=0; i<3; i++) {
        console.log('SearchData :>>', data);
        renderFoodResults(data[i])}
        
    })
    .catch(function (error) {
        console.error(error);
    });
}
//seperation of renderFoodResults, extraction of recipe id, name and image
function renderFoodResults (foodData) {
        var iD = foodData.id;
        var recipeName = foodData.title
        var recipeImage = foodData.image
        console.log(iD);
        console.log(recipeName);
        console.log(recipeImage);
        for (i=0; i<3; i++){
        fetchRecipeDetails(iD);//initiates connection from search to recipe itself}

}

//second fetch to grab the recipe details using extracted id 
function fetchRecipeDetails (id){
    
       fetch ('https://api.spoonacular.com/recipes/'+id+'/analyzedInstructions?'+FOOD_API_SECOND_KEY)
       .then(function (res) {
           if (!res.ok) throw new Error('oops got an error');
           return res.json();
       })
        .then (function (data){
            console.log(id);
           console.log("DetailData :>>", data);
           renderRecipeDetails(data[0]);

       })
       .catch(function (error) {
        console.error(error);
    });
}

//seperation of renderRecipeDetails
//current issue is that when I try to return the steps, it is showing up as an empty array
function renderRecipeDetails (detailData) {
    console.log("renderingDetails")
    var instruction = detailData.steps
    console.log(instruction)
}

searchButton.addEventListener('click', function() {
    testing = searchBox.value;
    fetchFoodResults(); //initates food functions
})