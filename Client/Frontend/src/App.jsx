import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ListFiles from './Components/ListFiles.jsx';
import UploadFile from './Components/uploadFile.jsx';
import Email from './Components/Email.jsx';

function App() {
const [saveData, setSaveData] = useState(null);

useEffect(()=>{
  fetchData();
}, [])

async function fetchData(){
  try {
    const response = await axios.get('http://localhost:2001/api/file/getAllFiles')
    // console.log(response.data);
    setSaveData(response.data);
  } catch (error) {
    console.log(error)
  }
  
}

  return (
    <div>
      <h1>File Sharing Application</h1>
      <UploadFile />
      {saveData && <ListFiles files={saveData}/>}
      <Email />
    </div>
  )
}

export default App
