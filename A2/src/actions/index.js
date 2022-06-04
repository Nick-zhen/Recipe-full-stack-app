export const add = recipe => {
    return {
        type: 'ADD_RECIPE',
        payload: recipe
    };
};

export const dele = recipe => {
    return {
        type: 'DELETE_RECIPE',
        payload: recipe
    }
}