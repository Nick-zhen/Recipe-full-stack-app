const jsonString = '{"uuid": "abcd", "name": "sushi", "ingredients": "meat, rice, shrimp","steps": "take rice, stack the meat, stack the shrimp"}';
var prefilled = JSON.parse(jsonString);
var properties = ['name','ingredients', 'steps'];
var recipes = [];

function init() {
    displayTable(prefilled);
    recipes.push(prefilled);
    printInConsole();
}

function printInConsole() {
    console.log(recipes);
}

function createDelOneButton() {
    var newDelOneButton = document.createElement('input');
    newDelOneButton.type = "button";
    newDelOneButton.className = "delOneButton";
    newDelOneButton.value = "X";
    
    return newDelOneButton;
}

function displayTable(recipe) {
    var lists = document.getElementById("rLists");
    var row = document.createElement('li');
    row.id = String(Math.floor(Math.random() * 1000));
    recipe.uuid = row.id;
    for (var i = 0; i < 3; ++i) {
        row.innerHTML += properties[i] + " : " +  recipe[properties[i]] + '<br>';
        if (i == 0) {
            var newDelOneButton = createDelOneButton();
            newDelOneButton.id = row.id + 1;
            // newDelOneButton.onclick = function () {
            //     deleteRecipe(row.id);
            //     console.log(row.id);
            // };
            
            // var newDelOneButton = document.createElement('input');
            // newDelOneButton.type = "button";
            // newDelOneButton.className = "delOneButton";
            // newDelOneButton.value = "X";
            // console.log(row.id);
            console.log(newDelOneButton);
            row.appendChild(newDelOneButton);
        }
    }
    lists.appendChild(row);
    document.getElementById(row.id + 1).onclick =  function () {
        deleteRecipe(row.id);
        console.log(row.id);
    };
    
}

function createObj() {
    var newRecipes = new Object();
    // newRecipes.uuid = String(Math.floor(Math.random() * 1000));
    newRecipes.name = document.getElementById("rTitle").value;
    newRecipes.ingredients = document.getElementById("ingredients").value;
    newRecipes.steps = document.getElementById("instructions").value;
    return newRecipes;
}

function addRecipe() {
    var newRecipes = createObj();
    if (!isEmpty(newRecipes)) {
        recipes.push(newRecipes);
    
        displayTable(newRecipes);
    }
    printInConsole();
}

function deleteRecipe(delId) {
    var myLists = document.getElementById("rLists");
    var lists = [...document.querySelectorAll("#rLists li")];
    // var wantDelRecipe = lists.filter(list => list.id == delId);
    // myLists.removeChild(wantDelRecipe);
    lists.forEach(elem => {
        if (elem.id == delId) elem.parentNode.removeChild(elem);
    });
    recipes = recipes.filter(list => list.uuid != delId);
    printInConsole();
}

function deleteAll() {
    recipes = [];
    var deletedLists = document.getElementById("rLists");
    deletedLists.remove();
    var showRecipe_div = document.getElementById("showRecipe-div");
    var newLists = document.createElement("ul");
    newLists.setAttribute('id', 'rLists');
    showRecipe_div.appendChild(newLists);
    // var len = recipes.length;
    // for (var i = 0; i < len; ++i) {
    //     deleteRecipe();
    // }
    printInConsole();
}

function isEmpty(recipe) {
    if ((recipe.name == "") || recipe.ingredients == "" || recipe.steps == "") {
        alert("Please input text!");
        return true;
    }
    return false;
}


init();