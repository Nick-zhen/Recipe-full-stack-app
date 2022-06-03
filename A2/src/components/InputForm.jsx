import InputText from "./InputText";
import { useState } from "react";
export default function InputForm() {
    const [title, setTitle] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [instruction, setInstruction] = useState("");

    const clearText = () => {
        setTitle("");
        setIngredient("");
        setInstruction("");
    }

    const handlesubmit = (event) => {
        // console.log(title);
        if (title === "" || ingredient === "" || instruction === "") {
            alert("plz input TEXT!");
        } else {
            alert("The recipe was submitted");
        }
    }

    return (
        <div>
            <h3>Add Recipe</h3>
            <form onSubmit={handlesubmit}>
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
            <button className="button button_stuff" onClick={handlesubmit}>Add</button>
            <button className="button button_stuff" onClick={clearText}>Clear</button>
        </div>
    );
}