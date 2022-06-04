import { useSelector } from "react-redux";

export default function RecipeLists(props) {
    // useSelector allows you to access the data in the Redux store
    const recipeLists = useSelector((state) => state.buttonOperation);
    console.log(recipeLists);
    return (
        <div>
            <div id="showRecipe-div">
                <ul id="rLists">
                    {recipeLists.map((recipe) => (
                        <li key={recipe.name}>
                            name: {recipe.name}<br/>
                            <input type="button" className="delOneButton" value="X"/>
                            ingredients: {recipe.ingredients}<br/>
                            steps: {recipe.steps}<br/>
                        </li>
                    ))}
                </ul> 
            </div>
        </div>
    );
}