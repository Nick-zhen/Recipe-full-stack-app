import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdListAsync, getRecipesAsync } from "../redux/recipes/thunks";
import Recipe from "./Recipe";
import React, {useState} from 'react'
import Popup from "./Popup";

export default function RecipeLists(props) {
    // useSelector allows you to access the data in the Redux store
    const recipeLists = useSelector(state => state.recipes.recipeList);

    const updIdList = useSelector(state => state.recipes.idList);
    const [popup, setPopup] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipesAsync());
    }, [dispatch]);

    async function popUpIdList() {
        dispatch(getIdListAsync());
        setPopup(true);
    }
    // console.log(updIdList);
    // console.log(recipeLists);
    return (
        <div>
            <div id="showRecipe-div">
                <button className="button button_stuff" style={{width: 200}} onClick={() => {popUpIdList();}}>show id list</button>
                <Popup trigger={popup} setPopup={setPopup}>
                    <ul>
                        {updIdList.map((id) => <li key={id}>{id}</li>)}
                    </ul>
                </Popup>
                <ul id="rLists">
                    {recipeLists?.map((recipe) => (
                        // add unique key at most upper level
                        // Keys only make sense in the context of the surrounding array.
                        // extract a Recipe comonent, I should add key on the <Recipe /> elements in the array
                        // rather than on the <li> element in the Recipe itself.
                        <Recipe recipe={recipe} key={recipe.id}/>
                    ))}
                </ul> 
                
            </div>
        </div>
    );
}