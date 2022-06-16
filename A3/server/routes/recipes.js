const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

const recipeLists = [
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

router.get('/', function (req, res, next) {
    return res.send(recipeLists);
});

router.get('/:recipeId', function (req, res, next) {
    const foundRecipe = recipeLists.find(recipe => recipe.id === req.params.recipeId);
    
    if (!foundRecipe) return res.status(404).send({ message: 'User not found' });
  
    return res.json({msg: "get recipe", foundRecipe});
});

router.post('/', function (req, res, next) {
    if (!req.body.name) {
        return res.status(400).send({ message: 'Recipe must have a name!' })
    } else if (!req.body.ingredients) {
        return res.status(400).send({ message: 'Recipe must have ingredients!' })
    } else if (!req.body.steps) {
        return res.status(400).send({ message: 'Recipe must have steps!' })
    }
    const recipe = { id: uuid(), name: req.body.name, ingredients: req.body.ingredients, steps: req.body.steps };
    recipeLists.push(recipe);
    return res.send(recipeLists);
});

module.exports = router;