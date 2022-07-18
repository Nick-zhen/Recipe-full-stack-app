import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import RecipeService from './service';

export const getRecipesAsync = createAsyncThunk(
    actionTypes.GET_RECIPES,
    async (_,thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        return await RecipeService.getRecipes(token);
    }
);

export const addRecipeAsync = createAsyncThunk(
    actionTypes.ADD_RECIPE,
    async (recipe, thunkAPI) => {
        // console.log(recipe);
        const token = thunkAPI.getState().auth.user.token;
        return await RecipeService.addRecipe(recipe, token);
    }
)

export const deleteRecipeAsync = createAsyncThunk(
    actionTypes.DELETE_RECIPE,
    async (recipeId) => {
        return await RecipeService.deleteRecipe(recipeId);
    }
)

export const updateRecipeAsync = createAsyncThunk(
    actionTypes.UPDATE_RECIPE,
    async (recipeAndId) => {
        // console.log(recipeAndId);
        const data = await RecipeService.updateRecipe(recipeAndId);
        // console.log(data)
        return data;
    }
)

export const getDetailsListAsync = createAsyncThunk(
    actionTypes.GET_DETAILS,
    async () => {
        return await RecipeService.getDetails();
    }
);

export const filterRecipeByLikesAsync = createAsyncThunk(
    actionTypes.FILTER_RECIPES_BY_LIKES,
    async (opAndNum) => {
        return await RecipeService.filterRecipeByLikes(opAndNum);
    }
)

export const incLikesAsync = createAsyncThunk(
    actionTypes.INC_LIKES,
    async (recipeId) => {
        return await RecipeService.incLikes(recipeId);
    }
)