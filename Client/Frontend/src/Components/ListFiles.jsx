import React from 'react'

function ListFiles({files}) {
  return (
    <div className='flex justify-center items-center gap-4 flex-col'>
      <h3 className='font-bold text-3xl text-teal-700'>Uploaded Files</h3>
      <div className='flex gap-2 flex-wrap'>
      {files.map((file) => {
        return(
            <li key={file.uuid} className='list-none w-44 h-44 shadow-md shadow-green-400 bg-emerald-300 rounded text-center flex items-center'>
                <a href={file.downloadLink}>{file.filename}</a>
            </li>
        )
      })}
      </div>
    </div>
  )
}

export default ListFiles;
