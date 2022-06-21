import Popup from "./Popup";
import { getIdListAsync } from "../redux/recipes/thunks";
import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

function IdList() {
    const updIdList = useSelector(state => state.recipes.idList);
    
    const [idPopup, setIdPopup] = useState(false);
    const dispatch = useDispatch();
    async function popUpIdList() {
        dispatch(getIdListAsync());
        setIdPopup(true);
    }
    return (
        <div>
            <button className="button button_stuff" style={{width: 200}} onClick={() => {popUpIdList();}}>show id list</button>
            <Popup trigger={idPopup} setPopup={setIdPopup}>
                <ul>
                    {updIdList.map((id) => <li key={id}>{id}</li>)}
                </ul>
            </Popup>
        </div>
    )
}

export default IdList

