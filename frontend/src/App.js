import './global.css';
import './App.css'
import React, {useEffect,useState,useRef} from 'react';
import Sidebar from './components/Sidebar';
import Notecard from './components/Notecard';
import './index';
import api from './services/api';
// import ReactDOM from 'react-dom/client';

function App() {
  const [allNotes,setAllNotes] = useState([]);
  const [filter,setFilter] = useState(false);
  const [reload,setReload] = useState(false);
  const listRef = useRef(null);

  //This use effect get all the instances in the database and group them in an object
  useEffect(() =>{
    async function getAllNotes() {
        const response = await api.get('/annotations/show-annotations');
        setAllNotes(response.data);
    }
    getAllNotes();
  },[reload])

  //This function is for allow the sons components to comunicate with this root component
  const notecardToApp = async (status) => {
    setReload({...status});
    console.log(status);
  }

  return (
    <div className='app'>
      <Sidebar notecardToApp = {notecardToApp}/>
    
      <ul ref = {listRef} id ='notecard-list-area'>
        {allNotes.map((data) => (
            <Notecard key = {data._id} data = {data} matherlist = {allNotes} notecardToApp = {notecardToApp}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
