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
        console.log(recipe);
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
        console.log(recipeAndId);
        return await RecipeService.updateRecipe(recipeAndId);
    }
)

export const getIdListAsync = createAsyncThunk(
    actionTypes.GET_IDLIST,
    async () => {
        return await RecipeService.getIdList();
    }
);