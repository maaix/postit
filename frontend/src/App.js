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

  useEffect(() =>{
    async function getAllNotes() {
        const response = await api.get('/annotations/show-annotations');
        setAllNotes(response.data);
    }
    getAllNotes();
    
    
  },[reload])

  const notecardToApp = async (status) => {
    setReload({...status});
    console.log(status);
  }
  // useEffect(() => {
  //  async function renderList() {
     
  //     // console.log(teste)

    
  //   // var componentArea =  document.getElementById('notecard-list-area');
  //   // componentArea.appendChild(allComponents);
  //   }
  //   renderList()
  // },[reload])

 

  return (
    <div className='app'>
      <Sidebar notecardToApp = {notecardToApp}/>
    
        <ul ref = {listRef} id ='notecard-list-area'>
          {
             allNotes.map((data)=> (
              <Notecard key = {data._id} data = {data} matherlist = {allNotes} notecardToApp = {notecardToApp}/>
              
             ))
          }
        </ul>
     
      
     
    </div>
  );
}

export default App;
