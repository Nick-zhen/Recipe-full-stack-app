const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const asyncHandler = require('express-async-handler');

const recipeList = [
    {
        id: "0",
        name: 'sushi',
        ingredients: "meat, rice, shrimp",
        steps: "take rice, stack the meat, stack the shrimp"
    },
    {
        id: "1",
        name: 'steak',
        ingredients: "beef",
        steps: "stack the meat"
    }
];

const idList = ["0", "1"];

router.get('/', asyncHandler(async function (req, res, next) {
    return res.send(recipeList);
}));

router.get('/:recipeId',asyncHandler(async function (req, res, next) {
    const foundRecipe = recipeList.find(recipe => recipe.id === req.params.recipeId);
    
    if (!foundRecipe) return res.status(404).send({ message: 'User not found' });
  
    return res.json({msg: "get recipe", foundRecipe});
}));

// create recipe
router.post('/',asyncHandler(async function (req, res, next) {
    if (!req.body.name) {
        return res.status(400).send({ message: 'Recipe must have a name!' })
    } else if (!req.body.ingredients) {
        return res.status(400).send({ message: 'Recipe must have ingredients!' })
    } else if (!req.body.steps) {
        return res.status(400).send({ message: 'Recipe must have steps!' })
    }
    const recipe = { id: uuid(), name: req.body.name, ingredients: req.body.ingredients, steps: req.body.steps };
    recipeList.push(recipe);
    idList.push(recipe.id);
    console.log(idList);
    console.log(req.body);
    return res.send(recipe);
}));

// update recipe
router.put('/:recipeId',asyncHandler(async function (req, res, next) {
    const recipe = recipeList.find((recipe) => recipe.id === req.params.recipeId);
    // return 404 if not found
    if (!recipe) return res.status(404).send({ message: 'Recipe not found for update' });

    const updRecipe = req.body;
    recipe.name = updRecipe.name ? updRecipe.name : recipe.name; 
    recipe.ingredients = updRecipe.ingredients ? updRecipe.ingredients : recipe.ingredients;
    recipe.steps = updRecipe.steps ? updRecipe.steps : recipe.steps;
    // res.json({msg: 'Recipe updated', recipe});
    console.log(recipe);
    return res.send(recipe);
}));

//delete recipe
router.delete('/:recipeId',asyncHandler(async function (req, res, next) {
    const delRecipe = recipeList.find((recipe) => recipe.id === req.params.recipeId);
    if (!delRecipe) res.status(404).send("The id is not found to delete");
    const idx = recipeList.indexOf(delRecipe);
    recipeList.splice(idx, 1);
    const idIdx = idList.indexOf(delRecipe.id);
    idList.splice(idIdx, 1);
    console.log(idList);
    console.log(delRecipe);
    return res.send(delRecipe);
}));

router.get('/id/list',asyncHandler(async function (req, res, next) {
    return res.send(JSON.stringify(idList));
}));
function compareStr(a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
router.get('/name/sort',asyncHandler(async function (req, res, next) {
    recipeList.sort((a, b) => {
        return compareStr(a.name, b.name);
    });
    console.log(recipeList);
    return res.send(recipeList);
}));

module.exports = router;