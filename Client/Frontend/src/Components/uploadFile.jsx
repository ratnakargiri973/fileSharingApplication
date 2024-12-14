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
         const response = await axios.post('https://filesharingapplication-server.onrender.com/api/file/upload', data);
         console.log(response.data);
       } 
       catch (error) {
        console.log(error)
       }
    }
  return (
    <div className='flex justify-center items-center gap-4 flex-col'>
      <h1 className='font-bold text-3xl text-teal-700'>Upload Files</h1>
      <form action="" encType="multipart/form-data" onSubmit={handleSubmit}>
      <input 
      type="file"
      name='file'
      onChange={handleChange} 
      className='outline-none rounded border-none'/>
      <button type='submit' className='p-2 rounded bg-blue-400 hover:bg-blue-600 hover:text-white'>Upload</button>
      </form>
    </div>
  )
}

export default uploadFile
