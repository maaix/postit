import React from "react";
import './Radiobutton.css'
import { useState } from "react";
import { useEffect } from "react";

export default function Radiobutton({radiobuttonToSidebar}){
    const [selected,setSelected] = useState('')

   useEffect(() => {
    console.log(selected)
    
    if(selected !== selected){
        let radio = document.getElementById(`{radio[i]}`)
    }
   },[selected])
    return (
        <div className="radio-area">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={ e => setSelected(e.target.id)}></input>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    All notes
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" onClick={ e => setSelected(e.target.id)}></input>
                <label className="form-check-label" htmlFor="defaultCheck2">
                    Priorited notes
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck3" onClick={ e => setSelected(e.target.id)}></input>
                <label className="form-check-label" htmlFor="defaultCheck2">
                    Normal Notes
                </label>
            </div>
        </div>
    );
}

