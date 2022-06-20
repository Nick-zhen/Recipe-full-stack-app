/* reference https://www.youtube.com/watch?v=i8fAO_zyFAM */
import React from 'react'
import './Popup.css'
import InputText from "./InputText";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getRecipesAsync, updateRecipeAsync } from '../redux/recipes/thunks';

function Popup(props) {
    const [title, setTitle] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [instruction, setInstruction] = useState("");

    const dispatch = useDispatch();

    const clearText = () => {
        setTitle("");
        setIngredient("");
        setInstruction("");
    }

    function updateRecipe() {
        const recipe = {
            id: props.recipeId,
            name: title,
            ingredients: ingredient,
            steps: instruction
        }
        dispatch(updateRecipeAsync(recipe));
        // not sure if it is a good way to implement it?
        dispatch(getRecipesAsync());
        clearText();
    }

    return props.trigger ? (
        <div className='popup'>
            <div className="popup-inner">
                <button className='close-btn' onClick={() => {props.setPopup(false);}}>close</button>
                { props.children }
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
            </div>
        </div>
    ) : ""
}

export default Popup
