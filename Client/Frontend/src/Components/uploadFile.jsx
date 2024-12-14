import React, { useState } from 'react'
import axios from 'axios';

function uploadFile() {
    const [files, setFiles] = useState(null);

    function handleChange(e){
        setFiles(e.target.files[0]);
    }

    async function handleSubmit(e){
        e.preventDefault();
       try {
         const data = new FormData();
         data.append("file", files);
         setFiles(null);
         const response = await axios.post('http://localhost:2001/api/file/upload', data);
         console.log(response.data);
       } 
       catch (error) {
        console.log(error)
       }
    }
  return (
    <div>
      <h1>Upload Files</h1>
      <form action="" encType="multipart/form-data" onSubmit={handleSubmit}>
      <input 
      type="file"
      name='file'
      onChange={handleChange} />
      <button type='submit'>Upload</button>
      </form>
    </div>
  )
}

export default uploadFile
