import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesAsync } from "../redux/recipes/thunks";
import Recipe from "./Recipe";
import { useNavigate } from 'react-router-dom'
import { reset } from '../redux/users/authSlice'

export default function RecipeLists(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    // useSelector allows you to access the data in the Redux store
    const recipeLists = useSelector(state => state.recipes.recipeList);
    const { user } = useSelector((state) => state.auth)
    
    useEffect(() => {

    if (!user) {
      navigate('/login')
    }

    dispatch(getRecipesAsync());

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])


    // useEffect(() => {
    //     dispatch(getRecipesAsync());
    // }, [dispatch]);

    // console.log(updIdList);
    // console.log(recipeLists);
    return (
        <div>
            <div id="showRecipe-div">
                
                <ul id="rLists">
                    {recipeLists?.map((recipe) => (
                        // add unique key at most upper level
                        // Keys only make sense in the context of the surrounding array.
                        // extract a Recipe comonent, I should add key on the <Recipe /> elements in the array
                        // rather than on the <li> element in the Recipe itself.
                        <Recipe recipe={recipe} key={recipe._id}/>
                    ))}
                </ul> 
                
            </div>
        </div>
    );
}