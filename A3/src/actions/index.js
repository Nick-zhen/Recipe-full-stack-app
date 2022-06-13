export const add = recipe => {
    return {
        type: 'ADD_RECIPE',
        payload: recipe
    };
};

export const dele = id => {
    return {
        type: 'DELETE_RECIPE',
        payload: id
    }
}