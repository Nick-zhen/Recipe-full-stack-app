const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipeModel');
const mongoose = require('mongoose');
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
    const recipeList = await Recipe.find();
    return res.status(200).send(recipeList);
}));

router.get('/:recipeId',asyncHandler(async function (req, res, next) {
    // const foundRecipe = recipeList.find(recipe => recipe.id === req.params.recipeId);
    Recipe.findById(req.params.recipeId, (err, recipe) => {
        if (err) {
            // console.log(err);
            return res.status(404).send({ message: 'recipe not found' });
        } else {
            console.log(recipe);
            return res.json({msg: "get recipe", recipe});
        }
    });
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
    const recipe = await Recipe.create({
        name: req.body.name, 
        ingredients: req.body.ingredients, 
        steps: req.body.steps,
        likes: 0,
        date: Date.now(),
    });
    console.log(req.body);
    return res.status(200).send(recipe);
}));
// TODO
// update recipe
router.put('/:recipeId',asyncHandler(async function (req, res, next) {
    /* 
    we cannot call recipe = await Recipe.findById(, callback), it will cause "MongooseError: 
    Query was already executed:" 
    Mongoose throws a 'Query was already executed' error when a given query is executed twice.
    */
    const recipe = Recipe.findById(req.params.recipeId, async (err, foundRecipe) => {
        if (err) {
            // when the format of input _id is incorrect
            return res.status(404).send({ message: 'recipe not found for update' });
        } else {
            // if _id format is correct but not found, still return a null instead of an error
            if (!foundRecipe) res.status(404).send({ message: 'recipe not found for update' });
            // we can use update but update() doesn't return the updated recipe
            const updRecipe = req.body;
            foundRecipe.name = updRecipe.name ? updRecipe.name : foundRecipe.name; 
            foundRecipe.ingredients = updRecipe.ingredients ? updRecipe.ingredients : foundRecipe.ingredients;
            foundRecipe.steps = updRecipe.steps ? updRecipe.steps : foundRecipe.steps;
            await foundRecipe.save();

            console.log(foundRecipe);
            return res.status(200).send(foundRecipe);
        }
    });
}));
// TODO
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
// TODO
router.get('/id/list',asyncHandler(async function (req, res, next) {
    return res.send(JSON.stringify(idList));
}));
function compareStr(a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
// TODO
router.get('/name/sort',asyncHandler(async function (req, res, next) {
    recipeList.sort((a, b) => {
        return compareStr(a.name, b.name);
    });
    console.log(recipeList);
    return res.send(recipeList);
}));

module.exports = router;