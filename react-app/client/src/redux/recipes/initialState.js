import { REQUEST_STATE } from '../utils';
const INITIAL_STATE = {
    recipeList: [],
    getRecipes: REQUEST_STATE.IDLE,
    addRecipe: REQUEST_STATE.IDLE,
    deleteRecipe: REQUEST_STATE.IDLE,
    updateRecipe: REQUEST_STATE.IDLE,
    error: null
};

