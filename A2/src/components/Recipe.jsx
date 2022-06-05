import React, {useState} from 'react'
import Popup from './Popup';

function Recipe(props) {
  // we need to create different state to show different recipes. That's why I create
  // a component for <Recipe />
  const [popup, setPopup] = useState(false);
  console.log(props.recipe);
  return (
    <div>
      <li>
          name: {props.recipe.name}<br/>
          <button className="detail-btn" onClick={() => {setPopup(true);}}>Detail</button>
          <input type="button" className="delOneButton" value="X"/>
          ingredients: {props.recipe.ingredients}<br/>
          <Popup trigger={popup} setPopup={setPopup}>
              steps: {props.recipe.steps}<br/>
          </Popup>
      </li>
    </div>
  )
}

export default Recipe
