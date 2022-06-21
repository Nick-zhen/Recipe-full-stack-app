import Navbar from "./Navbar";
import InputForm from "./InputForm";
import RecipeLists from "./ReceipeLists";
import SortList from "./SortList";
import IdList from "./IdList";

export default function RecipeBody() {
    return (
        <div>
            <Navbar />
            <InputForm />
            <IdList />
            <SortList />
            <RecipeLists />
        </div>
    );
}