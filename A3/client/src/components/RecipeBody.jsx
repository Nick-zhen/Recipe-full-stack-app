import Navbar from "./Navbar";
import InputForm from "./InputForm";
import RecipeLists from "./ReceipeLists";
export default function RecipeBody() {
    return (
        <div>
            <Navbar />
            <InputForm />
            <RecipeLists />
        </div>
    );
}