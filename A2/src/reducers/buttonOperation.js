import { initialRecipe } from "../initialRecipes"

const buttonOperation = (recipes = initialRecipe, action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return recipes.concat(action.payload);
        case 'DELETE_RECIPE':
            return recipes;
        default:
            return recipes;
    }
};

export default buttonOperation;