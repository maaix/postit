import './Sidebar.scss';
import React, {useState,useEffect} from 'react';
import api from '../services/api';
import Radiobutton from './Radiobutton';

export default function Sidebar(props) {
    const [title,setTitle] = useState();
    const [notes,setNotes] = useState();
    const [selected,setSelected] = useState('');

      //This fucttion warn the father component(App) of the cards to rerender the list of cards
    async function rerenderListt(isTrue){
        await props.notecardToApp(isTrue);
    }
   
    //This function calls a post request through axios api and save the data 
    async function handleSubmit(e){
        e.preventDefault();
        const response = await api.post('annotations/add-annotations', { 
            title,
            notes,
            priority: false,
        })
        setNotes('');
        setTitle('');
        rerenderListt(true);
        return response
    }
    
    const radiobuttonToSidebar = async (filteredNotes) => {
        setSelected(filteredNotes);
        console.log("o selecionado em Sidebar é: "+ selected);
    }

    async function rerenderList(filteredList){
        await props.sidebarToApp(filteredList);
    }
  

    useEffect(() => {
           
            rerenderList(selected);
            console.log("Mandando selecionado pro App:"+selected)
        
    },[selected])

    //This use effect actives the save button when the inputs are filled
    useEffect(() => {
        let saveButton = document.getElementById('btn_submit');
        saveButton.style.background = '#FFD3CA';
        if (title && notes){
            saveButton.style.background = '#EB8F7A'
        }
    },[title,notes])

    return (
        <div className="sidebar">
            <h1>Notebook</h1>
    
            <form onSubmit={handleSubmit}>
                <div className="input-block">
                    <label htmlFor="title">Annotation Title</label>
                    <input 
                        value={title} 
                        onChange = {e => setTitle(e.target.value)}// Previne o evento e altera o valor de "title"
                    ></input>
                </div>
        
                <div className="input-block">
                    <label htmlFor="title">Note</label>
                    <textarea 
                        value={notes}
                        onChange = {e => setNotes(e.target.value)}
                    ></textarea>
                </div>
        
                <button type="submit" id = 'btn_submit'>Save</button>
            </form>

            <Radiobutton className="radio" radiobuttonToSidebar = {radiobuttonToSidebar}/>
        </div>
    );
}

