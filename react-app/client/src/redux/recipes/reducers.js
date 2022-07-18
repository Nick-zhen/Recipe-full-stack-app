import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from "../utils";
import { getRecipesAsync, addRecipeAsync, deleteRecipeAsync, updateRecipeAsync, 
    getDetailsListAsync, filterRecipeByLikesAsync, incLikesAsync } from './thunks';


const INITIAL_STATE = {
    detailsList: [],
    recipeList: [],
    filterList: [],
    getRecipes: REQUEST_STATE.IDLE,
    getDetails: REQUEST_STATE.IDLE,
    addRecipe: REQUEST_STATE.IDLE,
    deleteRecipe: REQUEST_STATE.IDLE,
    updateRecipe: REQUEST_STATE.IDLE,
    filterRecipe: REQUEST_STATE.IDLE,
    incLikes: REQUEST_STATE.IDLE,
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
            // delete
            .addCase(deleteRecipeAsync.pending, (state) => {
                state.deleteRecipe = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteRecipeAsync.fulfilled, (state, action) => {
                state.deleteRecipe = REQUEST_STATE.FULFILLED;
                state.recipeList = state.recipeList.filter((recipe) => {
                    return recipe._id !== action.payload._id
                });
            })
            .addCase(deleteRecipeAsync.rejected, (state, action) => {
                state.deleteRecipe = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            // update recipe
            .addCase(updateRecipeAsync.pending, (state) => {
                state.updateRecipe = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(updateRecipeAsync.fulfilled, (state, action) => {
                state.updateRecipe = REQUEST_STATE.FULFILLED;
                state.recipeList.forEach((recipe, index) => {
                    if (recipe._id === action.payload._id) state.recipeList[index] = action.payload;
                });
            })
            .addCase(updateRecipeAsync.rejected, (state, action) => {
                state.updateRecipe = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            // get details(id, name, like, date)
            .addCase(getDetailsListAsync.pending, (state) => {
                state.getDetails = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getDetailsListAsync.fulfilled, (state, action) => {
                state.getDetails = REQUEST_STATE.FULFILLED;
                state.detailsList = action.payload;
            })
            .addCase(getDetailsListAsync.rejected, (state, action) => {
                state.getDetails = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            // filter recipes by likes
            .addCase(filterRecipeByLikesAsync.pending, (state) => {
                state.filterRecipe = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(filterRecipeByLikesAsync.fulfilled, (state, action) => {
                state.filterRecipe = REQUEST_STATE.FULFILLED;
                console.log(action.payload);
                state.filterList = action.payload.data;
            })
            .addCase(filterRecipeByLikesAsync.rejected, (state, action) => {
                state.filterRecipe = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            // increase likes for one specific recipe
            .addCase(incLikesAsync.pending, (state) => {
                state.incLikes = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(incLikesAsync.fulfilled, (state, action) => {
                state.incLikes = REQUEST_STATE.FULFILLED;
                console.log(action.payload);
                state.recipeList.forEach((recipe, index) => {
                    if (recipe._id === action.payload._id) state.recipeList[index].likes = action.payload.likes;
                });
            })
            .addCase(incLikesAsync.rejected, (state, action) => {
                state.incLikes = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
    }
});

export default recipesSlice.reducer;