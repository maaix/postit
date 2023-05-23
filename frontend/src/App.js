import './global.scss';
import './App.scss'
import React, {useEffect,useState,useRef} from 'react';
import Sidebar from './components/Sidebar';
import Notecard from './components/Notecard';

import './index';
import api from './services/api';
// import ReactDOM from 'react-dom/client';

function App() {
  const [allNotes,setAllNotes] = useState([]);
  const [selected,setSelected] = useState('');
  const [reload,setReload] = useState(false);
  const listRef = useRef(null);

  //This use effect get all the instances in the database and group them in an object
  useEffect(() =>{
    async function getAllNotes(selected) {
      if(selected === "btnradio1"){
        const response = await api.get('/annotations/show-annotations');
        setAllNotes(response.data);
      } 
      else if(selected === "btnradio2"){
        const response = await api.get('/annotations/show-priorited-annotations');
        setAllNotes(response.data);
        console.log(response);
      }
      else if(selected === "btnradio3"){
        const response = await api.get('/annotations/show-not-priorited-annotations');
        setAllNotes(response.data);
        console.log(response);
      }else{
        const response = await api.get('/annotations/show-annotations');
        setAllNotes(response.data);
      }
      
   
    }
    getAllNotes(selected);
  },[reload,selected])

  //This function is for allow the sons components to comunicate with this root component
  const notecardToApp = async (status) => {
    setReload({...status});
    console.log(status);
  }

  const sidebarToApp = async (filteredNotes) => {
    setSelected(filteredNotes);
    console.log("o selecionado em App é: "+ selected);
  }


  return (
    <div className='app'>
      <Sidebar sidebarToApp = {sidebarToApp} notecardToApp = {notecardToApp}/>
    
      <ul ref = {listRef} id ='notecard-list-area'>
        {allNotes.map((data) => (
            <Notecard key = {data._id} data = {data} matherlist = {allNotes} notecardToApp = {notecardToApp}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
