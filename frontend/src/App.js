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
          // console.log(response);
          
      }
      getAllNotes();
  },[allNotes])
  return (
    <div className='app'>
      <Sidebar/>
      <ul id ='notecard-list-area'>
        {allNotes.map(data => (
          <Notecard data = {data}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
