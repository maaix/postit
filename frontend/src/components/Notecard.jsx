import './Notecard.css'
import React from 'react';
import api from '../services/api';

// React Hooks Area
import { useState } from 'react';
import { useRef } from "react";
import { useEffect } from 'react'; 

// React Icons Imports Area
import {  BsFillTrash3Fill } from 'react-icons/bs';
import { BsExclamationCircleFill } from 'react-icons/bs'
import { BsFillPencilFill } from "react-icons/bs";

export default function Notecard(props){
    const [oldIndex,setOldIndex] = useState(0);
    const [allNotes,setAllNotes] = useState(props.matherlist);
    const[objectId,setObjectId] = useState(props.data._id);
    const [priority,setPriority] = useState(props.data.priority);
    const [priorityStyle,setPriorityStyle] = useState({});
    const [title,setTitle] = useState();
    const [notes,setNotes] = useState();
    const notecard = useRef(null);
    const textarea = useRef(null);
    const titleField = useRef(null);
    const priorityIcon = useRef(null);
    const editIcon = useRef(null);
    const deleteIcon = useRef(null);
    
    
    useEffect(() => {
            // setAllNotes(props.matherlist);
            // setObjectId(props.data._id);
            // setIndex(props.mykey);
            setPriority(props.data.priority)
    },[])

    useEffect(()=>{
        if(priority === true){
            setPriorityStyle({
                notecardColor: '#eb8f7a',
                textareaColor:'#eb8f7a',
                fontColor: '#fff'
            })   
        }
        else if (priority === false){
            setPriorityStyle({
                notecardColor: '#fff',
                textareaColor: '#fff',
                fontColor: 'black'
            }) 
        }
    },[priority])

    useEffect(() => {
        notecard.current.style.backgroundColor = priorityStyle.notecardColor;
        titleField.current.style.color = priorityStyle.fontColor;
        textarea.current.style.backgroundColor = priorityStyle.textareaColor;
        textarea.current.style.color = priorityStyle.fontColor;
        priorityIcon.current.style.color = priorityStyle.fontColor;
        editIcon.current.style.color = priorityStyle.fontColor;
        deleteIcon.current.style.color = priorityStyle.fontColor;
    })

    // useEffect(() => {
    //     setOldIndex(index)
    // },[])
    async function rerenderList(isTrue){
       await props.notecardToApp(isTrue);
    }
    async function handleDelete (e) {
        e.preventDefault();
        const response = await api.delete(`/annotations/delete-annotations/${objectId}`);
        
        rerenderList(true);
      
        return response
    }

    async function handlePriority(e) {
        e.preventDefault();

        if(priority === true){
            // setPriorityStyle({
            //     notecardColor: '#fff',
            //     textareaColor: '#fff'
            // })      
            setPriority(false);  
            
        } else {
            // setPriorityStyle({
            //     notecardColor: '#eb8f7a',
            //     textareaColor:'#eb8f7a'
            // })  
            setPriority(true)
            // setIndex(0);
            // const deletedItem = allNotes.splice(oldIndex,1);
            // console.log('item deletado:',deletedItem);
            // setAllNotes(allNotes.unshift(deletedItem));
            // console.log('todas as notas', allNotes);
        }
       
        const response = await api.post(`/annotations/priority/update-priority/${objectId}`,{
            priority:priority,
        })

        return response;
    }

    function handleEdit (e) {
        e.preventDefault();
        titleField.current.style.cursor = 'text';
        textarea.current.style.cursor = 'text';
        textarea.current.style.border ='1px solid  rgb(199, 199, 199)'
        titleField.current.contentEditable = true;
    }

    async function handleKey (e) {
        if(e.key === 'Enter'){
            const response = await api.post(`/annotations/update-annotations/${objectId}`,{
                title:title,
                notes:notes
            })

            return response
        }
    }

   async function resetStyle (e) {
        e.preventDefault()
        titleField.current.style.cursor = 'pointer';
        textarea.current.style.cursor = 'pointer';
        textarea.current.style.border ='none'
        titleField.current.contentEditable = false;

        const response = await api.post(`/annotations/update-annotations/${objectId}`,{
            title:title,
            notes:notes
        })
        return response
    }
    
    return (
        <>
            <div className="notepad-info" ref={notecard} id = {objectId}>
                <div className='card-header'>
                    <strong 

                        ref = {titleField}
                        onKeyDown = {handleKey}
                        onChange={e => setTitle(e.target.value)}>{props.data.title}
                        
                    </strong>
                    <div className="crud-icons">
                        <div onBlur = {resetStyle} ref = {editIcon} className='card-icon' >< BsFillPencilFill size={24}/></div>
                        <div ref = {deleteIcon} className='card-icon'onClick={handleDelete}><BsFillTrash3Fill size={24}/></div>
                    </div>
                   
                </div>
                
                <textarea 
                    className = 'anotations-description '
                    // contentEditable = 'False' 
                    ref={textarea} 
                    onClick={handleEdit}
                    onBlur = {resetStyle} 
                    onKeyDown = {handleKey}
                    defaultValue = {objectId}
                    onChange = {e => setNotes(e.target.value)}
                    
                    
                ></textarea>

                <div 
                    className='card-icon' 
                    ref = {priorityIcon}
                    onClick={handlePriority}>
                <BsExclamationCircleFill size={24}/></div>
            </div>
        </>
    );
};