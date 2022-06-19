const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

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

router.get('/', function (req, res, next) {
    return res.send(recipeList);
});

router.get('/:recipeId', function (req, res, next) {
    const foundRecipe = recipeList.find(recipe => recipe.id === req.params.recipeId);
    
    if (!foundRecipe) return res.status(404).send({ message: 'User not found' });
  
    return res.json({msg: "get recipe", foundRecipe});
});

// create recipe
router.post('/', function (req, res, next) {
    if (!req.body.recipe.name) {
        return res.status(400).send({ message: 'Recipe must have a name!' })
    } else if (!req.body.recipe.ingredients) {
        return res.status(400).send({ message: 'Recipe must have ingredients!' })
    } else if (!req.body.recipe.steps) {
        return res.status(400).send({ message: 'Recipe must have steps!' })
    }
    const recipe = { id: uuid(), name: req.body.recipe.name, ingredients: req.body.recipe.ingredients, steps: req.body.recipe.steps };
    recipeList.push(recipe);
    console.log(recipe);
    return res.send(recipe);
});

// update recipe
router.put('/:recipeId', function (req, res, next) {
    const updRecipe = req.body;
    recipeList.forEach((recipe => {
      if (recipe.id === req.params.recipeId) {
        recipe.name = updRecipe.name ? updRecipe.name : user.name; 
        res.json({msg: 'Recipe updated', recipe});
      }
    }))
    return res.status(404).send({ message: 'Recipe not found' });
});

//delete recipe
router.delete('/:recipeId', function (req, res, next) {
    const delRecipe = recipeList.find((recipe) => recipe.id === req.params.recipeId);
    if (!delRecipe) res.status(404).send("The id is not found to delete");
    const idx = recipeList.indexOf(delRecipe);
    recipeList.splice(idx, 1);
    console.log(delRecipe);
    return res.send(delRecipe);
});

module.exports = router;