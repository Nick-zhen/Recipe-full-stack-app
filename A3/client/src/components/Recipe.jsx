import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import Popup from './Popup';
import { deleteRecipeAsync } from '../redux/recipes/thunks';

function Recipe(props) {
  // we need to create different state to show different recipes. That's why I create
  // a component for <Recipe />
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();

  // bug: Maybe rendered twice
  // console.log(props.recipe);

  return (
    <div>
      <li>
          name: {props.recipe.name}<br/>
          <button className="detail-btn" onClick={() => {setPopup(true);}}>Detail</button>
          <button className="delOneButton" onClick={() => {dispatch(deleteRecipeAsync(props.recipe.id))}}>X</button>
          ingredients: {props.recipe.ingredients}<br/>
          <Popup trigger={popup} setPopup={setPopup}>
              steps: {props.recipe.steps}<br/>
          </Popup>
      </li>
    </div>
  )
}

export default Recipe
