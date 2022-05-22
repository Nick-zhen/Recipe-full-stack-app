const jsonString = '{"name": "sushi", "ingredients": "meat, rice, shrimp","steps": "take rice, stack the meat, stack the shrimp"}';
var prefilled = JSON.parse(jsonString);
var properties = ['name','ingredients', 'steps'];
var recipes = [];

function init() {
    displayTable(prefilled);
    recipes.push(prefilled);
}

function displayTable(recipe) {
    var lists = document.getElementById("rLists");
    var row = document.createElement('li');
    for (var i = 0; i < 3; ++i) {
        row.innerHTML += properties[i] + " : " +  recipe[properties[i]] + '<br>';
    }
    lists.appendChild(row);
}

function createObj() {
    var newRecipes = new Object();
    newRecipes.name = document.getElementById("rTitle").value;
    newRecipes.ingredients = document.getElementById("ingredients").value;
    newRecipes.steps = document.getElementById("instructions").value;
    return newRecipes;
}

function addRecipe() {
    var newRecipes = createObj();

    recipes.push(newRecipes);
    
    displayTable(newRecipes);
}

function deleteRecipe() {
    var myLists = document.getElementById("rLists");
    var lists = document.querySelectorAll("#rLists li");
    myLists.removeChild(lists[0]);
    recipes.pop();
}

function deleteAll() {
    // recipes = [];
    // var deletedLists = document.getElementById("rLists");
    // deletedLists.remove();
    // var showRecipe_div = document.getElementById("showRecipe-div");
    // var newLists = document.createElement("ul");
    // newLists.setAttribute('id', 'rLists');
    // showRecipe_div.appendChild(newLists);
    var len = recipes.length;
    for (var i = 0; i < len; ++i) {
        deleteRecipe();
    }
}

init();