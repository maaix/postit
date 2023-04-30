import './global.css';
import './App.css'
import React, {useEffect,useState} from 'react';
import Sidebar from './components/Sidebar';
import Notecard from './components/Notecard';
import './index';
import api from './services/api';
function App() {
  const [allNotes,setAllNotes] = useState([]);
  useEffect(() =>{
      async function getAllNotes() {
          const response = await api.get('/annotations/show-annotations');
          setAllNotes(response.data);
          //  console.log(response);
          
          
      }
      getAllNotes();
  },[])
  return (
    <div className='app'>
      <Sidebar/>
      <ul id ='notecard-list-area'>
        {allNotes.map((data,index)=> (
          <Notecard mykey = {index} data = {data} matherlist = {allNotes}/>
          
          
        ))}
      </ul>
    </div>
  );
}

export default App;
