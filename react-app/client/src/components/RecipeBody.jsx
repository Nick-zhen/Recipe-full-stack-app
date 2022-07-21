import Navbar from "./Navbar";
import InputForm from "./InputForm";
import RecipeLists from "./ReceipeLists";
import FilterList from "./FilterList";
import DetailsList from "./DetailsList";

export default function RecipeBody() {
    return (
        <div>
            <div className="body-div">
            <Navbar />
            <InputForm />
            <DetailsList />
            <FilterList />
            <RecipeLists />
            </div>
        </div>
    );
}