import './Sidebar.css';
import React, {useState,useEffect} from 'react';
import api from '../services/api';

export default function Sidebar() {
    const [title,setTitle] = useState();
    const [notes,setNotes] = useState();
   
    async function handleSubmit(e){
        e.preventDefault();
        const response = await api.post('annotations/add-annotations', { 
            title,
            notes,
            priority: false,
        })
        setNotes('');
        setTitle('');
        return response
    }
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
        
                <button type="submit">Save</button>
            </form>
      </div>
    );
}

