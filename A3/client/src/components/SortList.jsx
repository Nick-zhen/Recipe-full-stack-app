import Popup from "./Popup";
import { sortRecipeByNameAsync } from "../redux/recipes/thunks";
import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function SortList() {
    const [sortPopup, setSortPopup] = useState(false);
    const sortedRecipes = useSelector(state => state.recipes.recipeList);
    const dispatch = useDispatch();

    async function popoUpSortList() {
        dispatch(sortRecipeByNameAsync());
        setSortPopup(true);
    }

    return (
        <div>
            <button className="button button_stuff" style={{width: 200}}  onClick={() => {popoUpSortList();}}>sort by alphabet</button>
            <Popup trigger={sortPopup} setPopup={setSortPopup}>
                <h3>sort recipes by name: </h3>
                <ul>
                    {sortedRecipes.map((recipe) => <li key={recipe._id}>{recipe.name}</li>)}
                </ul>
            </Popup>
        </div>
    )
}
