const getRecipes = async () => {
    const response = await fetch('http://localhost:3001/recipes', {
        method: 'GET'
    });
    // console.log(response.json());
    return response.json();
};

const addRecipe = async (recipe) => {
    console.log(recipe);
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

const updateRecipe = async (recipeAndId) => {
    console.log(recipeAndId);
    const response = await fetch('http://localhost:3001/recipes/' + recipeAndId.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeAndId) 
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    
    return data;
}

const getIdList = async () => {
    const response = await fetch('http://localhost:3001/recipes/id/list', {
        method: 'GET'
    });
    return response.json();
};

const sortRecipesByName = async () => {
    const response = await fetch('http://localhost:3001/recipes/name/sort', {
        method: 'GET'
    });
    return response.json();
}

const RecipeService = {
    getRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    getIdList,
    sortRecipesByName,
};

export default RecipeService;