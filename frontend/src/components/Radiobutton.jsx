import React from "react";
import './Radiobutton.scss'
import { useState } from "react";
import { useEffect } from "react";

export default function Radiobutton(props){
    const [selected,setSelected] = useState('btnradio1');

    async function rerenderList(filteredList){
        await props.radiobuttonToSidebar(filteredList);
    }
  

    useEffect(() => {
            console.log("Selecionado em radio é:"+selected)
            rerenderList(selected);
        
    },[selected])

   
    
    // console.log(selected)
    // if(selected !== selected){
    //     let radio = document.getElementById(`{radio[i]}`)
    // }



    return (
       
            <div className="radio-area" role="group" aria-label="Basic radio toggle button group">
            
                <div className="radio-wrapper">
                    <input 
                        type="radio" 
                        className="" 
                        name="btnradio" 
                        id="btnradio1" 
                        autoComplete="on" 
                        onClick={e => setSelected(e.target.id)}
                    ></input>
                    <label className="" htmlFor="btnradio1">All Notes</label>
                </div>

               
                <div className="radio-wrapper">
                    <input 
                        type="radio" 
                        className="" 
                        name="btnradio" 
                        id="btnradio2" 
                        autoComplete="on" 
                        onClick={e => setSelected(e.target.id)}
                    ></input>
                    <label className="" htmlFor="btnradio2">Priorited Notes</label>
                </div>

               
                <div className="radio-wrapper">
                    <input 
                        type="radio" 
                        className="" 
                        name="btnradio" 
                        id="btnradio3" 
                        autoComplete="on"
                        onClick={e => setSelected(e.target.id)}
                    ></input>
                    <label className="" htmlFor="btnradio3">Normal Notes</label>
                </div>
            </div>
        
    );
}

