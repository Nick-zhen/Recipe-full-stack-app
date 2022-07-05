const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipeModel');
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
            // put likes just for dubug
            foundRecipe.likes = updRecipe.likes ? updRecipe.likes : foundRecipe.likes;
            await foundRecipe.save();

            console.log(foundRecipe);
            return res.status(200).send(foundRecipe);
        }
    });
}));

//delete recipe
router.delete('/:recipeId',asyncHandler(async function (req, res, next) {
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
}));

// increase like of a certain recipe
router.put('/likes/inc/:recipeId', asyncHandler(async function (req, res, next) {
    const recipe = Recipe.findById(req.params.recipeId, 'likes', async (err, foundRecipe) => {
        if (err) {
            // when the format of input _id is incorrect
            return res.status(404).send({ message: 'recipe not found for update' });
        } else {
            // if _id format is correct but not found, still return a null instead of an error
            if (!foundRecipe) res.status(404).send({ message: 'recipe not found for update' });
            foundRecipe.likes++;
            await foundRecipe.save();
            console.log(foundRecipe);
            return res.status(200).send(foundRecipe);
        }
    });
}));

// get recipe details(_id, name, like, date) stored in the same collection
router.get('/details/list', asyncHandler(async function (req, res, next) {
    const detailsList = await Recipe.find().select(['name', 'likes', 'date']);
    console.log(detailsList);
    return res.status(200).send(detailsList);
    // return res.send(JSON.stringify(idList)); 
}));

// TODO (didn't finish)
// get filtering data from the DB(likes > a number)
router.get('/filter/byLikes/:operation/:num', asyncHandler(async function (req, res, next) {
    if (req.params['operation'] === 'gt') {
        const filterRecipes = await Recipe.find({likes: { $gt: req.params['num']}}, 'name likes');
        if (filterRecipes.length === 0) return res.status(200).send({data:[], message: 'There is no filter found'}); 
        console.log(filterRecipes);
        return res.status(200).send({data: filterRecipes}); 
    } else {
        return res.json('There is no filter found'); 
    }
}));


// function compareStr(a, b) {
//     return (a < b) ? -1 : (a > b) ? 1 : 0;
// }
// router.get('/name/sort', asyncHandler(async function (req, res, next) {
//     recipeList.sort((a, b) => {
//         return compareStr(a.name, b.name);
//     });
//     console.log(recipeList);
//     return res.send(recipeList);
// }));

module.exports = router;