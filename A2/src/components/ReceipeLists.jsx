import { useSelector } from "react-redux";
import Recipe from "./Recipe";

export default function RecipeLists(props) {
    // useSelector allows you to access the data in the Redux store
    const recipeLists = useSelector((state) => state.buttonOperation);
    

    // console.log(recipeLists);
    return (
        <div>
            <div id="showRecipe-div">
                <ul id="rLists">
                    {recipeLists.map((recipe) => (
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