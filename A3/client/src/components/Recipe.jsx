import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import Popup from './Popup';
import { getRecipesAsync, updateRecipeAsync, deleteRecipeAsync } from '../redux/recipes/thunks';
import InputText from "./InputText";

function Recipe(props) {
  // we need to create different state to show different recipes. That's why I create
  // a component for <Recipe />
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();

  // bug: Maybe rendered twice
  // console.log(props.recipe);

  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");

  const clearText = () => {
      setTitle("");
      setIngredient("");
      setInstruction("");
  }

  function updateRecipe() {
    const recipe = {
        id: props.recipe.id,
        name: title,
        ingredients: ingredient,
        steps: instruction
    }
    dispatch(updateRecipeAsync(recipe));
    // not sure if it is a good way to implement it?
    dispatch(getRecipesAsync());
    clearText();
  }

  return (
    <div>
      <li>
          name: {props.recipe.name}<br/>
          <button className="detail-btn" onClick={() => {setPopup(true);}}>update</button>
          <button className="delOneButton" onClick={() => {dispatch(deleteRecipeAsync(props.recipe.id))}}>X</button>
          ingredients: {props.recipe.ingredients}<br/>
          steps: {props.recipe.steps}<br/>
          <Popup trigger={popup} setPopup={setPopup}>
            input for updateing recipe<br/>
            <form>
                    <InputText 
                        value = {title}
                        name="Title" 
                        rows="2" 
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }} 
                    /><br/>
                    <InputText 
                        value = {ingredient}
                        name="ingredients" 
                        rows="4" 
                        onChange={(event) => {
                            setIngredient(event.target.value);
                        }} 
                    /><br/>
                    <InputText 
                        value = {instruction}
                        name="instructions" 
                        rows="5"
                        onChange={(event) => {
                            setInstruction(event.target.value);
                        }} 
                    /><br/><br/>
                </form>
                <button className="button button_stuff" onClick={updateRecipe}>update</button>
          </Popup>
      </li>
    </div>
  )
}

export default Recipe
