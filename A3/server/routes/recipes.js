const express = require('express');
const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipeModel');
const router = express.Router();
const {
    getRecipes,
    createRecipe,
    updRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');
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

router.route('/').get(getRecipes).post(createRecipe);
router.route('/:recipeId').put(updRecipe).delete(deleteRecipe);

router.get('/:recipeId',asyncHandler(async function (req, res, next) {
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