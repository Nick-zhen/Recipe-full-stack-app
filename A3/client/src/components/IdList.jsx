import Popup from "./Popup";
import { getDetailsListAsync } from "../redux/recipes/thunks";
import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

// it should be DetailsList()
function IdList() {
    const detailsList = useSelector(state => state.recipes.detailsList);
    // console.log(detailsList);
    const [idPopup, setIdPopup] = useState(false);
    const dispatch = useDispatch();
    async function popUpIdList() {
        dispatch(getDetailsListAsync());
        
        setIdPopup(true);
    }
    return (
        <div>
            <button className="button button_stuff" style={{width: 200}} onClick={() => {popUpIdList();}}>show id list</button>
            <Popup trigger={idPopup} setPopup={setIdPopup}>
                <ul>
                    {detailsList.map((detail) => <li key={detail._id}>{detail.name}: {detail.likes} likes. Created on {detail.date}</li>)}
                </ul>
            </Popup>
        </div>
    )
}

export default IdList

