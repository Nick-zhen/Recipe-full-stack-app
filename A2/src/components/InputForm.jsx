import IngredientInput from "./IngredientInput";
import TitleInput from "./TitleInput";
import InstructionInput from "./InstructionInput";
export default function InputForm() {
    return (
        <div>
            <h3>Add Recipe</h3>
            <form id="inputForm">
                <TitleInput />
                <IngredientInput />
                <InstructionInput />
                {/* <input type="button" class="button button_stuff" onclick="addRecipe()" value="Add">
                <input type="reset" class="button button_stuff" value="Clear"> */}
            </form>
        </div>
    );
}