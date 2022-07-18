
const initialRecipe = [
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
const buttonOperation = (recipes = initialRecipe, action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return recipes.concat(action.payload);
        case 'DELETE_RECIPE':
            return recipes.filter((recipe) => recipe.id !== action.payload);
        default:
            return recipes;
    }
};

export default buttonOperation;