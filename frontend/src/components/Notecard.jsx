import './Notecard.css'
import React from 'react';
import api from '../services/api';
import { useState } from 'react';
export default function Notecard({data}){
    const[objectId,setObjectId] = useState(data._id);
    const [priority,setPriority] = useState(data.priority);

    async function handleDelete (e) {
        e.preventDefault();
        const response = await api.delete(`/annotations/delete-annotations/${objectId}`);
        return response
    }

    async function handlePriority(e) {
        e.preventDefault();
        if(priority === true){
            setPriority(false) 
            
        }
        else {
            setPriority(true)
        }
        console.log(priority)
        const response = await api.post(`/annotations/update-annotations/${objectId}`,{
            priority:priority,
            



            
        })
        return response;
    }
    return (
       
        <>
            <div className="notepad-info">
                <div className='card-header'>
                    <strong>{data.title}</strong>
                    <div className='card-icon'onClick={handleDelete}>x</div>
                </div>
                
                <textarea>{data.notes}</textarea>
                <div className='card-icon'onClick={handlePriority}>!</div>
            </div>
        </>
    );
};