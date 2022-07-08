const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipeModel');

const getRecipes = asyncHandler(async function (req, res, next) {
    const recipeList = await Recipe.find();
    return res.status(200).send(recipeList);
});

const createRecipe = asyncHandler(async function (req, res, next) {
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
});

const updRecipe = asyncHandler(async function (req, res, next) {
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
            // put likes just for dubug
            foundRecipe.likes = updRecipe.likes ? updRecipe.likes : foundRecipe.likes;
            await foundRecipe.save();

            console.log(foundRecipe);
            return res.status(200).send(foundRecipe);
        }
    });
});

const deleteRecipe = asyncHandler(async function (req, res, next) {
    const recipe = Recipe.findById(req.params.recipeId, async (err, foundRecipe) => {
        if (err) {
            // when the format of input _id is incorrect
            return res.status(404).send({ message: 'id incorrect for remove' });
        } else {
            // if _id format is correct but not found, still return a null instead of an error
            if (!foundRecipe) res.status(404).send({ message: 'recipe not found for remove' });
            await foundRecipe.remove();

            console.log(req.params.recipeId);
            return res.status(200).json({_id: req.params.recipeId});
        }
    });
});

module.exports = {
    getRecipes,
    createRecipe,
    updRecipe,
    deleteRecipe,
}