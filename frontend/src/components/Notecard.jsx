import './Notecard.css'
import React from 'react';
import api from '../services/api';
import { useState } from 'react';
import { useRef } from "react";
import { useEffect } from 'react';
export default function Notecard(props){
    // const [oldIndex,setOldIndex] = useState(0);
    // const [allNotes,setAllNotes] = useState([]);
    const[objectId,setObjectId] = useState(props.data._id);
    const [priority,setPriority] = useState(props.data.priority);
    // const [index,setIndex] = useState(0);
    // const [isTrue, setIsTrue] = useState(false)
    // const[isFalse,setIsFalse] = useState(false);
    const [priorityStyle,setPriorityStyle] = useState({});
    const notecard = useRef(null);
    const textarea = useRef(null);
   
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
                textareaColor:'#eb8f7a'
            })   
            console.log('passou pelo if de prioridade true')  
        }
        else if (priority === false){
            setPriorityStyle({
                notecardColor: '#fff',
                textareaColor: '#fff'
            }) 
            console.log('passou pelo if de prioridade false') 
        }

        
    },[])
    useEffect(() => {
        notecard.current.style.backgroundColor = priorityStyle.notecardColor;
        textarea.current.style.backgroundColor = priorityStyle.textareaColor;
    })
    // useEffect(() =>{
    //     async function renderPriority(){

    //         if(priority === true){
    //             setPriorityStyle({
    //                 notecardColor: '#eb8f7a',
    //                 textareaColor:'#eb8f7a'
    //             })   
    //             console.log('passou pelo if de prioridade true')  
    //         }
    //         else if (priority === false){
    //             setPriorityStyle({
    //                 notecardColor: '#fff',
    //                 textareaColor: '#fff'
    //             }) 
    //             console.log('passou pelo if de prioridade false') 
    //         }
    //         console.log(priority)

    //     }
    //    renderPriority();
    // },[])
    // useEffect (() => {
    //     async function priorityFalseState (){
    //         setPriority(false);
    //         console.log(priority);
         
    //     }
    //     priorityFalseState();
        
    // },[priority])

    // useEffect (() => {
    //     async function priorityTrueState(){
            
    //         notecard.current.style.backgroundColor = '#eb8f7a';
    //         textarea.current.style.backgroundColor = '#eb8f7a';
    //         // console.log('Index original',index)
    //         // setOldIndex(index)
    //         // console.log('index original armazenado em oldindex:',oldIndex)
    //         // setIndex(0);
    //         // console.log('Index original alterado;',index)
    //         // var deletedItem = allNotes.splice(oldIndex,1);
    //         // console.log('item deletado:',deletedItem);
    //         // setAllNotes(allNotes.unshift(deletedItem));
    //         // console.log('todas as notas', allNotes);
    //     }
    //     priorityTrueState()
   
    // },[isTrue])
   
   
    async function handleDelete (e) {
        e.preventDefault();
        const response = await api.delete(`/annotations/delete-annotations/${objectId}`);
        return response
    }

    async function handlePriority(e) {
        e.preventDefault();
        if(priority === true){
            
            setPriorityStyle({
                notecardColor: '#fff',
                textareaColor: '#fff'
            })      
            setPriority(false);  
        }
        else {
            // console.log('Prioridade antes do setPriority true:',priority);
            
            setPriorityStyle({
                notecardColor: '#eb8f7a',
                textareaColor:'#eb8f7a'
            })  
            setPriority(true)
            // console.log('Prioriade depois do setPriority true:',priority);
           

        }
        // console.log(priority)
        const response = await api.post(`/annotations/priority/update-priority/${objectId}`,{
            priority:priority,
        })
        // console.log(notecard.current)
        return response;
    }
    
   
    return (
       
        <>
            <div className="notepad-info" ref={notecard} id = {objectId}>
                <div className='card-header'>
                    <strong>{props.data.title}</strong>
                    <div className='card-icon'onClick={handleDelete}>x</div>
                </div>
                
                <textarea ref={textarea} defaultValue = {props.data.notes}></textarea>
                <div className='card-icon' onClick={handlePriority}>!</div>
            </div>
        </>
    );
};