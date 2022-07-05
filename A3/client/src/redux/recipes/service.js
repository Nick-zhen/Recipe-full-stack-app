const getRecipes = async () => {
    const response = await fetch('http://localhost:3001/recipes', {
        method: 'GET'
    });
    const data = await response.json()
    console.log(data);
    return data;
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
    console.log(recipeId);
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
    const response = await fetch('http://localhost:3001/recipes/' + recipeAndId._id, {
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

const getDetails = async () => {
    const response = await fetch('http://localhost:3001/recipes/details/list', {
        method: 'GET'
    });
    return response.json();
};

const filterRecipeByLikes = async (opAndNum) => {
    const response = await fetch('http://localhost:3001/recipes/filter/byLikes/' + opAndNum.operation + '/' + opAndNum.num, {
        method: 'GET'
    });
    const data = await response.json();
    console.log(data);
    return data;
}

const incLikes = async (recipeId) => {
    const response = await fetch('http://localhost:3001/recipes/likes/inc/' + recipeId, {
        method: 'PUT'
    });

    const data = await response.json();
    console.log(data);
    return data;
}
const RecipeService = {
    getRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    getDetails,
    filterRecipeByLikes,
    incLikes,
};

export default RecipeService;