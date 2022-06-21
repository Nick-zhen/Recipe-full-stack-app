import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from "../utils";
import { getRecipesAsync, addRecipeAsync, deleteRecipeAsync, updateRecipeAsync, 
    getIdListAsync, sortRecipeByNameAsync } from './thunks';


const INITIAL_STATE = {
    idList: [],
    recipeList: [],
    getRecipes: REQUEST_STATE.IDLE,
    addRecipe: REQUEST_STATE.IDLE,
    deleteRecipe: REQUEST_STATE.IDLE,
    updateRecipe: REQUEST_STATE.IDLE,
    sortRecipe: REQUEST_STATE.IDLE,
    error: null
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: INITIAL_STATE,
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRecipesAsync.pending, (state) => {
                state.getRecipes = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getRecipesAsync.fulfilled, (state, action) => {
                state.getRecipes = REQUEST_STATE.FULFILLED;
                state.recipeList = action.payload;
            })
            .addCase(getRecipesAsync.rejected, (state, action) => {
                state.getRecipes = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(addRecipeAsync.pending, (state) => {
                state.addRecipe = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(addRecipeAsync.fulfilled, (state, action) => {
                state.addRecipe = REQUEST_STATE.FULFILLED;
                state.recipeList.push(action.payload);
            })
            .addCase(addRecipeAsync.rejected, (state, action) => {
                state.addRecipe = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(deleteRecipeAsync.pending, (state) => {
                state.deleteRecipe = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteRecipeAsync.fulfilled, (state, action) => {
                state.deleteRecipe = REQUEST_STATE.FULFILLED;
                state.recipeList = state.recipeList.filter((recipe) => recipe.id !== action.payload.id);
            })
            .addCase(deleteRecipeAsync.rejected, (state, action) => {
                state.deleteRecipe = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(updateRecipeAsync.pending, (state) => {
                state.updateRecipe = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(updateRecipeAsync.fulfilled, (state, action) => {
                state.updateRecipe = REQUEST_STATE.FULFILLED;
                state.recipeList.forEach(recipe => {
                    if (recipe.id === action.payload.id) recipe = action.payload;
                });
            })
            .addCase(updateRecipeAsync.rejected, (state, action) => {
                state.updateRecipe = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(getIdListAsync.pending, (state) => {
                state.getRecipes = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getIdListAsync.fulfilled, (state, action) => {
                state.getRecipes = REQUEST_STATE.FULFILLED;
                state.idList = action.payload;
            })
            .addCase(getIdListAsync.rejected, (state, action) => {
                state.getRecipes = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            // sort recipes by alphbet
            .addCase(sortRecipeByNameAsync.pending, (state) => {
                state.sortRecipe = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(sortRecipeByNameAsync.fulfilled, (state, action) => {
                state.sortRecipe = REQUEST_STATE.FULFILLED;
                state.recipeList = action.payload;
            })
            .addCase(sortRecipeByNameAsync.rejected, (state, action) => {
                state.sortRecipe = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
    }
});

export default recipesSlice.reducer;