import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import RecipeService from './service';

export const getRecipesAsync = createAsyncThunk(
    actionTypes.GET_RECIPES,
    async () => {
        return await RecipeService.getRecipes();
    }
);

export const addRecipeAsync = createAsyncThunk(
    actionTypes.ADD_RECIPE,
    async (recipe) => {
        // console.log(recipe);
        return await RecipeService.addRecipe(recipe);
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

export const sortRecipeByNameAsync = createAsyncThunk(
    actionTypes.SORT_RECIPES_BY_NAME,
    async () => {
        return await RecipeService.sortRecipesByName();
    }
)