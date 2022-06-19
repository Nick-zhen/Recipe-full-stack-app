const getRecipes = async () => {
    const response = await fetch('http://localhost:3001/recipes', {
        method: 'GET'
    });
    // console.log(response.json());
    return response.json();
};

const addRecipe = async (recipe) => {
    const response = await fetch('http://localhost:3001/recipes', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(recipe) 
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    
    return data;
};

const deleteRecipe = async (recipeId) => {
    const response = await fetch('http://localhost:3001/recipes/' + recipeId, {
        method: 'DELETE'
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    
    return data;
};

const RecipeService = {
    getRecipes,
    addRecipe,
    deleteRecipe,

};

export default RecipeService;