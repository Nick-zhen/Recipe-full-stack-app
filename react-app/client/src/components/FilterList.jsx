import Popup from "./Popup";
import { filterRecipeByLikesAsync } from "../redux/recipes/thunks";
import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function FilterList() {
    const [num, setNum] = useState("");
    const [sortPopup, setSortPopup] = useState(false);
    const filteredRecipes = useSelector(state => state.recipes.filterList);
    const dispatch = useDispatch();

    async function popoUpSortList() {
        const paramInformation = {
            operation: document.getElementById("op").value,
            num: num
        };
        console.log(paramInformation);
        dispatch(filterRecipeByLikesAsync(paramInformation));
        setSortPopup(true);
    }

    return (
        <div>
            <label>choose for operation: </label>
            <select id="op">
                <option value="gt">greater</option>
                <option value="l">less</option>
                <option value="eq">equal</option>
            </select>
            <input 
                value={num}
                
                onChange={(event) => {setNum(event.target.value);}}>
            </input>
            <button className="button button_stuff" style={{width: 200}}  onClick={() => {popoUpSortList();}}>filter by likes</button>
            <Popup trigger={sortPopup} setPopup={setSortPopup}>
                {filteredRecipes.length !== 0 ? 
                <div>
                    <h3>filters by likes: </h3>
                    <ul>
                        {filteredRecipes.map((recipe) => <li key={recipe._id}>{recipe.name}, likes: {recipe.likes}</li>)} 
                    </ul>
                </div> :
                <p>there is no recipes found</p>}  
                
            </Popup>
        </div>
    )
}
